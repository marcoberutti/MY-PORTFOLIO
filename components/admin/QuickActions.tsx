'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function QuickActions() {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-primary">Quick Actions</h3>
      <div className="flex gap-4">
        <Link 
          href="/"
          target="_blank"
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark transition"
        >
          View Public Site
        </Link>
        <button 
          onClick={handleRefresh}
          className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}
