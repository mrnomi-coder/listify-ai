import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "listify_session";
const SESSION_AGE_SECONDS = 60 * 60 * 24 * 14;
export class AuthError extends Error { constructor(message = "Authentication required") { super(message); this.name = "AuthError"; } }
function getSecret() { const secret = process.env.AUTH_SECRET; if (!secret) throw new Error("AUTH_SECRET is required."); return new TextEncoder().encode(secret); }
export async function hashPassword(password: string) { return bcrypt.hash(password, 12); }
export async function verifyPassword(password: string, hash: string) { return bcrypt.compare(password, hash); }
export async function createSession(userId: string) { const token = await new SignJWT({ userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(`${SESSION_AGE_SECONDS}s`).sign(getSecret()); const store = await cookies(); store.set(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: SESSION_AGE_SECONDS, path: "/" }); }
export async function destroySession() { const store = await cookies(); store.delete(COOKIE_NAME); }
export async function getSessionPayload() { const store = await cookies(); const token = store.get(COOKIE_NAME)?.value; if (!token) return null; try { return (await jwtVerify<{ userId: string }>(token, getSecret())).payload; } catch { return null; } }
export async function getCurrentUser() { const payload = await getSessionPayload(); if (!payload?.userId) return null; return prisma.user.findUnique({ where: { id: payload.userId }, select: { id: true, name: true, email: true, role: true, image: true, createdAt: true } }); }
export async function requireUser() { const user = await getCurrentUser(); if (!user) throw new AuthError(); return user; }
