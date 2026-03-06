'use client';

import { useState } from 'react';
import type { Education } from '@/types';

interface EducationManagerProps {
  initialEducation: Education[];
}

export default function EducationManager({ initialEducation }: EducationManagerProps) {
  const [education, setEducation] = useState<Education[]>(initialEducation);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleAdd = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      year: new Date().getFullYear().toString(),
      institution: 'New Institution',
      title: 'New Degree/Course',
    };
    setEducation([...education, newEdu]);
    setEditingId(newEdu.id);
  };

  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this education entry?')) {
      setEducation(education.filter(edu => edu.id !== id));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/portfolio/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(education),
      });

      if (!response.ok) throw new Error('Failed to save');

      setMessage('Education saved successfully!');
      setEditingId(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving education');
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

      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          + Add Education
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition disabled:bg-gray-400"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-4">
        {education.map(edu => (
          <div key={edu.id} className="border rounded-lg p-4 hover:shadow-md transition">
            {editingId === edu.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleUpdate(edu.id, 'year', e.target.value)}
                    className="border rounded px-3 py-2"
                    placeholder="Year (e.g., 2024)"
                  />
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                    className="border rounded px-3 py-2"
                    placeholder="Institution"
                  />
                </div>
                <input
                  type="text"
                  value={edu.title}
                  onChange={(e) => handleUpdate(edu.id, 'title', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Degree/Course title"
                />
                <textarea
                  value={edu.description || ''}
                  onChange={(e) => handleUpdate(edu.id, 'description', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Description (optional)"
                  rows={2}
                />
                <input
                  type="url"
                  value={edu.certificateUrl || ''}
                  onChange={(e) => handleUpdate(edu.id, 'certificateUrl', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Certificate URL (optional)"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="cursor-pointer"
                onClick={() => setEditingId(edu.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-primary">{edu.year}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="font-semibold">{edu.institution}</span>
                  </div>
                  <span className="text-blue-600 hover:underline text-sm">Click to edit</span>
                </div>
                <div className="text-gray-700">{edu.title}</div>
                {edu.description && <div className="text-sm text-gray-500 mt-1">{edu.description}</div>}
                {edu.certificateUrl && (
                  <div className="text-sm text-blue-600 mt-1">
                    <a href={edu.certificateUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      View Certificate →
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
