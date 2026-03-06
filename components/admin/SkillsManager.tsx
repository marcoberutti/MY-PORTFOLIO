'use client';

import { useState } from 'react';
import type { Skill } from '@/types';

interface SkillsManagerProps {
  initialSkills: Skill[];
}

export default function SkillsManager({ initialSkills }: SkillsManagerProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleAdd = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: 'New Skill',
      level: 50,
      category: 'Other',
    };
    setSkills([...skills, newSkill]);
    setEditingId(newSkill.id);
  };

  const handleUpdate = (id: string, field: keyof Skill, value: string | number) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/portfolio/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skills),
      });
      console.log('Save response:', response);

      if (!response.ok) throw new Error('Failed to save');

      setMessage('Skills saved successfully!');
      setEditingId(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving skills');
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
          + Add Skill
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
        {skills.map(skill => (
          <div key={skill.id} className="border rounded-lg p-4 hover:shadow-md transition">
            {editingId === skill.id ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleUpdate(skill.id, 'name', e.target.value)}
                  className="border rounded px-3 py-2"
                  placeholder="Skill name"
                />
                <input
                  type="number"
                  value={skill.level}
                  onChange={(e) => handleUpdate(skill.id, 'level', parseInt(e.target.value))}
                  min="0"
                  max="100"
                  className="border rounded px-3 py-2"
                />
                <input
                  type="text"
                  value={skill.category || ''}
                  onChange={(e) => handleUpdate(skill.id, 'category', e.target.value)}
                  className="border rounded px-3 py-2"
                  placeholder="Category"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="grid grid-cols-1 md:grid-cols-4 gap-4 cursor-pointer"
                onClick={() => setEditingId(skill.id)}
              >
                <div className="font-semibold">{skill.name}</div>
                <div>Level: {skill.level}%</div>
                <div className="text-gray-600">{skill.category}</div>
                <div className="text-right text-blue-600 hover:underline">Click to edit</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
