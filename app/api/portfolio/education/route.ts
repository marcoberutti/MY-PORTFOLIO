import { NextRequest, NextResponse } from 'next/server';
import { updateEducation, getPortfolioData } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.education);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const education = await request.json();
    await updateEducation(education);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 });
  }
}
