'use client';

import { useState } from 'react';

interface ContactProps {
  email: string;
}

export default function Contact({ email }: ContactProps) {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: userEmail, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setName('');
      setUserEmail('');
      setMessage('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const isFormValid = name.trim() !== '' && message.trim() !== '' && userEmail.trim() !== '';

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">Get In Touch</h2>
      
      {status === 'success' && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-xl text-center border border-green-200 shadow-lg animate-fade-in-up">
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}
      
      {status === 'error' && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-xl text-center border border-red-200 shadow-lg animate-fade-in-up">
          ✕ {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            placeholder="John Doe"
            required
            disabled={status === 'loading'}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Your Email Address
          </label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            placeholder="your.email@example.com"
            required
            disabled={status === 'loading'}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300"
            placeholder="Write your message here..."
            required
            disabled={status === 'loading'}
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || status === 'loading'}
          className={`group relative w-full py-3 rounded-lg font-semibold overflow-hidden transition-all duration-300 ${
            isFormValid && status !== 'loading'
              ? 'bg-primary text-white hover:shadow-xl hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span className="relative z-10">
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </span>
          {isFormValid && status !== 'loading' && (
            <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          )}
        </button>
      </form>
    </div>
  );
}
