import Link from 'next/link';
import { getPortfolioData } from '@/lib/db';
import { getContactMessages } from '@/lib/contact';
import QuickActions from '@/components/admin/QuickActions';

export default async function AdminDashboard() {
  const data = await getPortfolioData();
  const messages = await getContactMessages();
  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Link 
          href="/admin/personal-info"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-xl font-bold mb-2 text-primary">Personal Info</h3>
          <p className="text-gray-600">Edit your personal information</p>
          <p className="text-sm text-gray-400 mt-4">{data.personalInfo.name}</p>
        </Link>

        <Link 
          href="/admin/skills"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-xl font-bold mb-2 text-primary">Skills</h3>
          <p className="text-gray-600">Manage your skills</p>
          <p className="text-sm text-gray-400 mt-4">{data.skills.length} skills</p>
        </Link>

        <Link 
          href="/admin/education"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-xl font-bold mb-2 text-primary">Education</h3>
          <p className="text-gray-600">Manage education entries</p>
          <p className="text-sm text-gray-400 mt-4">{data.education.length} entries</p>
        </Link>

        <Link 
          href="/admin/work-experience"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-xl font-bold mb-2 text-primary">Work Experience</h3>
          <p className="text-gray-600">Manage work experience</p>
          <p className="text-sm text-gray-400 mt-4">{data.workExperience.length} entries</p>
        </Link>
      </div>

      <div className="grid md:grid-cols-1 gap-6">
        <Link 
          href="/admin/messages"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition relative"
        >
          <h3 className="text-xl font-bold mb-2 text-primary">Contact Messages</h3>
          <p className="text-gray-600">View and manage contact form submissions</p>
          <p className="text-sm text-gray-400 mt-4">
            {messages.length} total messages
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {unreadCount} unread
              </span>
            )}
          </p>
        </Link>
      </div>

      <QuickActions />
    </div>
  );
}
