import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { createSession, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { signupSchema } from "@/lib/validators";
export const runtime = "nodejs";
export async function POST(request: Request) { const body = await request.json().catch(() => null); const parsed = signupSchema.safeParse(body); if (!parsed.success) return NextResponse.json({ error: "Enter a valid name, email, and password." }, { status: 400 }); const limited = await rateLimit({ key: `signup:${parsed.data.email}`, limit: 5, windowSeconds: 600 }); if (!limited.allowed) return NextResponse.json({ error: "Too many signup attempts." }, { status: 429 }); try { const user = await prisma.user.create({ data: { name: parsed.data.name, email: parsed.data.email.toLowerCase(), passwordHash: await hashPassword(parsed.data.password), subscription: { create: { plan: "STARTER", status: "trialing" } } }, select: { id: true, name: true, email: true } }); await createSession(user.id); return NextResponse.json({ user }, { status: 201 }); } catch (error) { if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 }); throw error; } }
