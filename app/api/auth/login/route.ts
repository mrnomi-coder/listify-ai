import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validators";
export const runtime = "nodejs";
export async function POST(request: Request) { const body = await request.json().catch(() => null); const parsed = loginSchema.safeParse(body); if (!parsed.success) return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 }); const email = parsed.data.email.toLowerCase(); const limited = await rateLimit({ key: `login:${email}`, limit: 10, windowSeconds: 600 }); if (!limited.allowed) return NextResponse.json({ error: "Too many login attempts." }, { status: 429 }); const user = await prisma.user.findUnique({ where: { email }, select: { id: true, name: true, email: true, passwordHash: true } }); if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 }); await createSession(user.id); return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } }); }
