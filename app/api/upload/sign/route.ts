import { NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/auth";
import { createCloudinarySignature } from "@/lib/cloudinary";
import { rateLimit } from "@/lib/rate-limit";
export const runtime = "nodejs";
export async function POST() { try { const user = await requireUser(); const limited = await rateLimit({ key: `upload:${user.id}`, limit: 120, windowSeconds: 3600 }); if (!limited.allowed) return NextResponse.json({ error: "Upload rate limit reached." }, { status: 429 }); return NextResponse.json(createCloudinarySignature()); } catch (error) { if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: 401 }); const message = error instanceof Error ? error.message : "Unable to sign upload."; return NextResponse.json({ error: message }, { status: 400 }); } }
