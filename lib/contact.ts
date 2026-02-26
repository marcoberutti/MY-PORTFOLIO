import type { ContactMessage } from '@/types/contact';
import fs from 'fs/promises';
import path from 'path';
import type { Redis as IORedis } from 'ioredis';

const MESSAGES_KEY = 'portfolio:messages';
const JSON_FILE_PATH = path.join(process.cwd(), 'data', 'messages.json');

// Redis client singleton
let ioRedisClient: IORedis | null = null;

// Check if standard Redis is available
const isRedisAvailable = () => {
  return !!process.env.REDIS_URL;
};

// Check if Vercel KV is available
const isKVAvailable = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

// Get standard Redis client (ioredis)
async function getRedisClient(): Promise<IORedis | null> {
  if (!isRedisAvailable()) return null;
  
  if (ioRedisClient) return ioRedisClient;
  
  try {
    const Redis = (await import('ioredis')).default;
    ioRedisClient = new Redis(process.env.REDIS_URL!);
    return ioRedisClient;
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error);
    return null;
  }
}

// Lazy import Vercel KV
async function getKV() {
  if (!isKVAvailable()) return null;
  
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
    // Try standard Redis first
    const redisClient = await getRedisClient();
    if (redisClient) {
      const messagesStr = await redisClient.get(MESSAGES_KEY);
      const messages: ContactMessage[] = messagesStr ? JSON.parse(messagesStr) : [];
      messages.unshift(newMessage);
      await redisClient.set(MESSAGES_KEY, JSON.stringify(messages));
      console.log('✅ Message saved to Redis');
      return;
    }

    // Fallback to Vercel KV
    const kv = await getKV();
    if (kv) {
      const messages = (await kv.get<ContactMessage[]>(MESSAGES_KEY)) || [];
      messages.unshift(newMessage);
      await kv.set(MESSAGES_KEY, messages);
      console.log('✅ Message saved to Vercel KV');
      return;
    }

    // Final fallback: write to JSON file
    let messages: ContactMessage[] = [];
    try {
      const content = await fs.readFile(JSON_FILE_PATH, 'utf-8');
      messages = JSON.parse(content);
    } catch {
      // File doesn't exist yet
    }
    messages.unshift(newMessage);
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(messages, null, 2), 'utf-8');
    console.log('✅ Message saved to local JSON file');
  } catch (error) {
    console.error('❌ Failed to save message:', error);
    throw new Error('Failed to save message');
  }
}

// Get all contact messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    // Try standard Redis first
    const redisClient = await getRedisClient();
    if (redisClient) {
      const messagesStr = await redisClient.get(MESSAGES_KEY);
      return messagesStr ? JSON.parse(messagesStr) : [];
    }

    // Fallback to Vercel KV
    const kv = await getKV();
    if (kv) {
      const messages = await kv.get<ContactMessage[]>(MESSAGES_KEY);
      return messages || [];
    }

    // Final fallback: read from JSON file
    try {
      const content = await fs.readFile(JSON_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    } catch {
      return [];
    }
  } catch (error) {
    console.warn('Using empty messages fallback:', error);
    return [];
  }
}

// Mark message as read
export async function markMessageAsRead(id: string): Promise<void> {
  try {
    const messages = await getContactMessages();
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, read: true } : msg
    );

    // Try standard Redis first
    const redisClient = await getRedisClient();
    if (redisClient) {
      await redisClient.set(MESSAGES_KEY, JSON.stringify(updatedMessages));
      return;
    }

    // Fallback to Vercel KV
    const kv = await getKV();
    if (kv) {
      await kv.set(MESSAGES_KEY, updatedMessages);
      return;
    }

    // Final fallback: write to JSON file
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(updatedMessages, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to mark message as read:', error);
    throw new Error('Failed to update message');
  }
}

// Delete a message
export async function deleteContactMessage(id: string): Promise<void> {
  try {
    const messages = await getContactMessages();
    const updatedMessages = messages.filter((msg) => msg.id !== id);

    // Try standard Redis first
    const redisClient = await getRedisClient();
    if (redisClient) {
      await redisClient.set(MESSAGES_KEY, JSON.stringify(updatedMessages));
      return;
    }

    // Fallback to Vercel KV
    const kv = await getKV();
    if (kv) {
      await kv.set(MESSAGES_KEY, updatedMessages);
      return;
    }

    // Final fallback: write to JSON file
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(updatedMessages, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to delete message:', error);
    throw new Error('Failed to delete message');
  }
}
