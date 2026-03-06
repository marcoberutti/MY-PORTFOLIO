'use client';

import { useState } from 'react';
import type { WorkExperience } from '@/types';

interface WorkExperienceManagerProps {
  initialWorkExperience: WorkExperience[];
}

export default function WorkExperienceManager({ initialWorkExperience }: WorkExperienceManagerProps) {
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(initialWorkExperience);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleAdd = () => {
    const newWork: WorkExperience = {
      id: Date.now().toString(),
      period: new Date().getFullYear().toString(),
      company: 'New Company',
      responsibilities: ['New responsibility'],
    };
    setWorkExperience([...workExperience, newWork]);
    setEditingId(newWork.id);
  };

  const handleUpdate = (id: string, field: keyof WorkExperience, value: string | string[]) => {
    setWorkExperience(workExperience.map(work => 
      work.id === id ? { ...work, [field]: value } : work
    ));
  };

  const handleAddResponsibility = (id: string) => {
    setWorkExperience(workExperience.map(work => 
      work.id === id 
        ? { ...work, responsibilities: [...work.responsibilities, ''] }
        : work
    ));
  };

  const handleUpdateResponsibility = (id: string, index: number, value: string) => {
    setWorkExperience(workExperience.map(work => {
      if (work.id === id) {
        const newResp = [...work.responsibilities];
        newResp[index] = value;
        return { ...work, responsibilities: newResp };
      }
      return work;
    }));
  };

  const handleDeleteResponsibility = (id: string, index: number) => {
    setWorkExperience(workExperience.map(work => {
      if (work.id === id) {
        return { 
          ...work, 
          responsibilities: work.responsibilities.filter((_, i) => i !== index) 
        };
      }
      return work;
    }));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this work experience entry?')) {
      setWorkExperience(workExperience.filter(work => work.id !== id));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/portfolio/work-experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workExperience),
      });

      if (!response.ok) throw new Error('Failed to save');

      setMessage('Work experience saved successfully!');
      setEditingId(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving work experience');
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
          + Add Work Experience
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
        {workExperience.map(work => (
          <div key={work.id} className="border rounded-lg p-4 hover:shadow-md transition">
            {editingId === work.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={work.period}
                    onChange={(e) => handleUpdate(work.id, 'period', e.target.value)}
                    className="border rounded px-3 py-2"
                    placeholder="Period (e.g., 2020-2023)"
                  />
                  <input
                    type="text"
                    value={work.company}
                    onChange={(e) => handleUpdate(work.id, 'company', e.target.value)}
                    className="border rounded px-3 py-2"
                    placeholder="Company"
                  />
                </div>
                <input
                  type="text"
                  value={work.role || ''}
                  onChange={(e) => handleUpdate(work.id, 'role', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Role/Position (optional)"
                />
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Responsibilities</label>
                  {work.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => handleUpdateResponsibility(work.id, idx, e.target.value)}
                        className="flex-1 border rounded px-3 py-2"
                        placeholder="Responsibility"
                      />
                      <button
                        onClick={() => handleDeleteResponsibility(work.id, idx)}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddResponsibility(work.id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    + Add Responsibility
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleDelete(work.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="cursor-pointer"
                onClick={() => setEditingId(work.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-primary">{work.period}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="font-semibold">{work.company}</span>
                  </div>
                  <span className="text-blue-600 hover:underline text-sm">Click to edit</span>
                </div>
                {work.role && <div className="text-gray-700 font-medium mb-2">{work.role}</div>}
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  {work.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
