'use client';

import { useState } from 'react';
import type { ContactMessage } from '@/types/contact';

interface MessagesManagerProps {
  initialMessages: ContactMessage[];
}

export default function MessagesManager({ initialMessages }: MessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      setMessages(messages.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      alert('Error deleting message');
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to mark as read');

      setMessages(
        messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
    } catch (error) {
      alert('Error updating message');
    }
  };

  const handleSelectMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.read) {
      handleMarkRead(message.id);
    }
  };

  const unreadCount = messages.filter((msg) => !msg.read).length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4 text-sm text-gray-600">
        Total: {messages.length} messages ({unreadCount} unread)
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No messages yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleSelectMessage(message)}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedMessage?.id === message.id
                    ? 'border-primary bg-blue-50'
                    : 'border-gray-300 hover:border-primary'
                } ${!message.read ? 'bg-blue-50/50 font-semibold' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-semibold text-gray-900">{message.name}</div>
                  {!message.read && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-1">{message.email}</div>
                <div className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </div>
                <div className="text-sm text-gray-700 mt-2 line-clamp-2">
                  {message.message}
                </div>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="border rounded-lg p-6">
            {selectedMessage ? (
              <div>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedMessage.name}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-primary hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(selectedMessage.timestamp).toLocaleString('en-US', {
                      dateStyle: 'full',
                      timeStyle: 'short',
                    })}
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="whitespace-pre-wrap text-gray-700">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Your portfolio message`}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark text-center"
                  >
                    Reply via Email
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
