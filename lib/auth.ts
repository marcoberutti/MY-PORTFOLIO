import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');

export interface SessionPayload {
  userId: string;
  username: string;
  expiresAt: Date;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createSession(username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  const session = await new SignJWT({ username, expiresAt: expiresAt.toISOString() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(secret);

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function verifySession(): Promise<SessionPayload | null> {
  const cookie = (await cookies()).get('session')?.value;
  
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, secret);
    return {
      userId: payload.username as string,
      username: payload.username as string,
      expiresAt: new Date(payload.expiresAt as string),
    };
  } catch (error) {
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete('session');
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error('Admin credentials not configured');
    return false;
  }

  // For simplicity, we're comparing plain text. In production, use hashed passwords
  return username === adminUsername && password === adminPassword;
}
