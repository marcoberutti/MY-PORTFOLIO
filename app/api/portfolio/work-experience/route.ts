import { NextRequest, NextResponse } from 'next/server';
import { updateWorkExperience, getPortfolioData } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.workExperience);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch work experience' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const workExperience = await request.json();
    await updateWorkExperience(workExperience);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update work experience' }, { status: 500 });
  }
}
