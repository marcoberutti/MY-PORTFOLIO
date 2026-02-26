import portfolioData from '@/data/portfolio.json';
import type { PortfolioData } from '@/types';
import fs from 'fs/promises';
import path from 'path';
import type { Redis as IORedis } from 'ioredis';

const DATA_KEY = 'portfolio:data';
const JSON_FILE_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

// Redis client singleton
let ioRedisClient: IORedis | null = null;

// Check if standard Redis is available
const isRedisAvailable = () => {
  return !!process.env.REDIS_URL;
};

// Check if Vercel KV is available
const isKVAvailable = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

// Get standard Redis client (ioredis)
async function getRedisClient(): Promise<IORedis | null> {
  if (!isRedisAvailable()) return null;
  
  if (ioRedisClient) return ioRedisClient;
  
  try {
    const Redis = (await import('ioredis')).default;
    ioRedisClient = new Redis(process.env.REDIS_URL!);
    console.log('✅ Connected to Redis');
    return ioRedisClient;
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error);
    return null;
  }
}

// Lazy import Vercel KV only if available
async function getKV() {
  if (!isKVAvailable()) return null;
  
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
    // Try standard Redis first
    const redisClient = await getRedisClient();
    if (redisClient) {
      const existingData = await redisClient.get(DATA_KEY);
      if (!existingData) {
        await redisClient.set(DATA_KEY, JSON.stringify(portfolioData));
        console.log('✅ Data initialized in Redis');
      }
      return;
    }
    
    // Fallback to Vercel KV
    const kv = await getKV();
    if (kv) {
      const existingData = await kv.get(DATA_KEY);
      if (!existingData) {
        await kv.set(DATA_KEY, portfolioData);
        console.log('✅ Data initialized in Vercel KV');
      }
      return;
    }
    
    console.log('ℹ️ No Redis/KV configured, using local JSON');
  } catch (error) {
    console.warn('⚠️ Redis/KV not available, using local data:', error);
  }
}

// Get portfolio data (from Redis or fallback to local JSON)
export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    // Try standard Redis first
    const redisClient = await getRedisClient();
    if (redisClient) {
      const data = await redisClient.get(DATA_KEY);
      if (data) {
        return JSON.parse(data) as PortfolioData;
      }
      return portfolioData as PortfolioData;
    }
    
    // Fallback to Vercel KV
    const kv = await getKV();
    if (kv) {
      const data = await kv.get<PortfolioData>(DATA_KEY);
      return data || portfolioData as PortfolioData;
    }
    
    // Final fallback to local JSON
    console.log('Using local JSON data (no Redis/KV configured)');
    return portfolioData as PortfolioData;
  } catch (error) {
    console.warn('Using local data fallback:', error);
    return portfolioData as PortfolioData;
  }
}

// Update portfolio data
export async function updatePortfolioData(data: PortfolioData): Promise<void> {
  try {
    // Try standard Redis first
    const redisClient = await getRedisClient();
    if (redisClient) {
      await redisClient.set(DATA_KEY, JSON.stringify(data));
      console.log('✅ Data saved to Redis');
      return;
    }
    
    // Fallback to Vercel KV
    const kv = await getKV();
    if (kv) {
      await kv.set(DATA_KEY, data);
      console.log('✅ Data saved to Vercel KV');
      return;
    }
    
    // Final fallback: write to JSON file
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    console.log('✅ Data saved to local JSON file');
  } catch (error) {
    console.error('❌ Failed to update data:', error);
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
