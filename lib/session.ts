import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { findUserById } from './db';

const COOKIE_NAME = 'goon_session';
const ALG = 'HS256';

function secret(): Uint8Array {
  const raw = process.env.NEXTAUTH_SECRET || process.env.SECRET_KEY || 'goon-dev-secret-change-me';
  return new TextEncoder().encode(raw);
}

export type SessionPayload = {
  sub: string;
  email: string;
};

export async function createSession(userId: string, email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: ALG })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secret());
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function destroySession() {
  cookies().set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
}

export async function getSessionUser() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    const user = findUserById(payload.sub as string);
    return user ?? null;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = COOKIE_NAME;
