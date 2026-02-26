import type { ContactMessage } from '@/types/contact';
import fs from 'fs/promises';
import path from 'path';

const MESSAGES_KEY = 'portfolio:messages';
const JSON_FILE_PATH = path.join(process.cwd(), 'data', 'messages.json');

// Check if KV is available
const isKVAvailable = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

// Lazy import KV
async function getKV() {
  if (!isKVAvailable()) {
    return null;
  }
  try {
    const { kv } = await import('@vercel/kv');
    return kv;
  } catch {
    return null;
  }
}

// Save a contact message
export async function saveContactMessage(
  name: string,
  email: string,
  message: string
): Promise<void> {
  const newMessage: ContactMessage = {
    id: Date.now().toString(),
    name,
    email,
    message,
    timestamp: Date.now(),
    read: false,
  };

  try {
    const kv = await getKV();

    if (kv) {
      // Production: use Vercel KV
      const messages = (await kv.get<ContactMessage[]>(MESSAGES_KEY)) || [];
      messages.unshift(newMessage); // Add to beginning
      await kv.set(MESSAGES_KEY, messages);
      console.log('Message saved to Vercel KV');
    } else {
      // Development: write to JSON file
      let messages: ContactMessage[] = [];
      try {
        const content = await fs.readFile(JSON_FILE_PATH, 'utf-8');
        messages = JSON.parse(content);
      } catch {
        // File doesn't exist yet, start with empty array
      }
      messages.unshift(newMessage);
      await fs.writeFile(JSON_FILE_PATH, JSON.stringify(messages, null, 2), 'utf-8');
      console.log('Message saved to local JSON file');
    }
  } catch (error) {
    console.error('Failed to save message:', error);
    throw new Error('Failed to save message');
  }
}

// Get all contact messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const kv = await getKV();

    if (kv) {
      const messages = await kv.get<ContactMessage[]>(MESSAGES_KEY);
      return messages || [];
    } else {
      // Development: read from JSON file
      try {
        const content = await fs.readFile(JSON_FILE_PATH, 'utf-8');
        return JSON.parse(content);
      } catch {
        return [];
      }
    }
  } catch (error) {
    console.warn('Using empty messages fallback:', error);
    return [];
  }
}

// Mark message as read
export async function markMessageAsRead(id: string): Promise<void> {
  try {
    const kv = await getKV();
    const messages = await getContactMessages();
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, read: true } : msg
    );

    if (kv) {
      await kv.set(MESSAGES_KEY, updatedMessages);
    } else {
      await fs.writeFile(JSON_FILE_PATH, JSON.stringify(updatedMessages, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Failed to mark message as read:', error);
    throw new Error('Failed to update message');
  }
}

// Delete a message
export async function deleteContactMessage(id: string): Promise<void> {
  try {
    const kv = await getKV();
    const messages = await getContactMessages();
    const updatedMessages = messages.filter((msg) => msg.id !== id);

    if (kv) {
      await kv.set(MESSAGES_KEY, updatedMessages);
    } else {
      await fs.writeFile(JSON_FILE_PATH, JSON.stringify(updatedMessages, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Failed to delete message:', error);
    throw new Error('Failed to delete message');
  }
}
