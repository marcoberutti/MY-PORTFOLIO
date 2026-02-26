import { NextRequest, NextResponse } from 'next/server';
import { updatePersonalInfo, getPortfolioData } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.personalInfo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch personal info' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const personalInfo = await request.json();
    await updatePersonalInfo(personalInfo);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update personal info' }, { status: 500 });
  }
}
