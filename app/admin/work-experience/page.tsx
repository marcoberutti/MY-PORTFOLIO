import { getPortfolioData } from '@/lib/db';
import WorkExperienceManager from '@/components/admin/WorkExperienceManager';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function AdminWorkExperiencePage() {
  const data = await getPortfolioData();

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center text-primary hover:underline mb-4">
        <ChevronLeft size={20} />
        Back to Dashboard
      </Link>
      <h2 className="text-3xl font-bold mb-8">Manage Work Experience</h2>
      <WorkExperienceManager initialWorkExperience={data.workExperience} />
    </div>
  );
}
