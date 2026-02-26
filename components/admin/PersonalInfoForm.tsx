'use client';

import { useState } from 'react';
import type { PersonalInfo } from '@/types';

interface PersonalInfoFormProps {
  initialData: PersonalInfo;
}

export default function PersonalInfoForm({ initialData }: PersonalInfoFormProps) {
  const [data, setData] = useState<PersonalInfo>(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/portfolio/personal-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save');

      setMessage('Personal info saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving personal info');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {message && (
        <div className={`mb-4 p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Role / Job Title</label>
            <input
              type="text"
              value={data.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Location</label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">GitHub URL</label>
            <input
              type="url"
              value={data.github}
              onChange={(e) => handleChange('github', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">LinkedIn URL</label>
            <input
              type="url"
              value={data.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">WhatsApp URL</label>
            <input
              type="url"
              value={data.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Instagram URL (Optional)</label>
          <input
            type="url"
            value={data.instagram || ''}
            onChange={(e) => handleChange('instagram', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition disabled:bg-gray-400"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
