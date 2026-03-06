import { NextRequest, NextResponse } from 'next/server';
import { updateSkills, getPortfolioData } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

async function handleUpdate(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const skills = await request.json();
    await updateSkills(skills);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update skills' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  return handleUpdate(request);
}

export async function POST(request: NextRequest) {
  return handleUpdate(request);
}
