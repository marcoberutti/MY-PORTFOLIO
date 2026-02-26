import { getPortfolioData } from '@/lib/db';
import EducationManager from '@/components/admin/EducationManager';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function AdminEducationPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center text-primary hover:underline mb-4">
        <ChevronLeft size={20} />
        Back to Dashboard
      </Link>
      <h2 className="text-3xl font-bold mb-8">Manage Education</h2>
      <EducationManager initialEducation={data.education} />
    </div>
  );
}
