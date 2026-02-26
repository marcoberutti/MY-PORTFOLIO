import portfolioData from '@/data/portfolio.json';
import type { PortfolioData } from '@/types';
import fs from 'fs/promises';
import path from 'path';

const DATA_KEY = 'portfolio:data';
const JSON_FILE_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

// Check if KV is available
const isKVAvailable = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

// Lazy import KV only if available
async function getKV() {
  if (!isKVAvailable()) {
    return null;
  }
  try {
    const { kv } = await import('@vercel/kv');
    return kv;
  } catch {
    return null;
  }
}

// Initialize Redis with default data if not exists
export async function initializeData() {
  try {
    const kv = await getKV();
    if (!kv) return;
    
    const existingData = await kv.get(DATA_KEY);
    if (!existingData) {
      await kv.set(DATA_KEY, portfolioData);
    }
  } catch (error) {
    console.warn('Redis not available, using local data:', error);
  }
}

// Get portfolio data (from Redis or fallback to local JSON)
export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const kv = await getKV();
    if (!kv) {
      console.log('Using local JSON data (KV not configured)');
      return portfolioData as PortfolioData;
    }
    
    const data = await kv.get<PortfolioData>(DATA_KEY);
    return data || portfolioData as PortfolioData;
  } catch (error) {
    console.warn('Using local data fallback:', error);
    return portfolioData as PortfolioData;
  }
}

// Update portfolio data
export async function updatePortfolioData(data: PortfolioData): Promise<void> {
  try {
    const kv = await getKV();
    
    if (kv) {
      // Production: use Vercel KV
      await kv.set(DATA_KEY, data);
      console.log('Data saved to Vercel KV');
    } else {
      // Development: write to JSON file
      await fs.writeFile(JSON_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
      console.log('Data saved to local JSON file');
    }
  } catch (error) {
    console.error('Failed to update data:', error);
    throw new Error('Failed to update data');
  }
}

// Specific update functions
export async function updatePersonalInfo(data: PortfolioData['personalInfo']) {
  const portfolio = await getPortfolioData();
  portfolio.personalInfo = data;
  await updatePortfolioData(portfolio);
}

export async function updateSkills(skills: PortfolioData['skills']) {
  const portfolio = await getPortfolioData();
  portfolio.skills = skills;
  await updatePortfolioData(portfolio);
}

export async function updateEducation(education: PortfolioData['education']) {
  const portfolio = await getPortfolioData();
  portfolio.education = education;
  await updatePortfolioData(portfolio);
}

export async function updateWorkExperience(workExperience: PortfolioData['workExperience']) {
  const portfolio = await getPortfolioData();
  portfolio.workExperience = workExperience;
  await updatePortfolioData(portfolio);
}
