import { NextResponse } from "next/server";
import { z } from "zod";
import { AuthError, requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { enqueueListingGeneration } from "@/lib/queue";
import { rateLimit } from "@/lib/rate-limit";
import { productCreateSchema } from "@/lib/validators";
export const runtime = "nodejs";
const bulkSchema = z.object({ items: z.array(productCreateSchema).min(1).max(100) });
export async function POST(request: Request) { try { const user = await requireUser(); const limited = await rateLimit({ key: `bulk:${user.id}`, limit: 10, windowSeconds: 3600 }); if (!limited.allowed) return NextResponse.json({ error: "Bulk processing rate limit reached." }, { status: 429 }); const body = await request.json().catch(() => null); const parsed = bulkSchema.safeParse(body); if (!parsed.success) return NextResponse.json({ error: "Invalid bulk payload." }, { status: 400 }); const jobs = await Promise.all(parsed.data.items.map(async (item) => { const product = await prisma.product.create({ data: { userId: user.id, imageUrl: item.imageUrl, sourceUrl: item.sourceUrl, price: item.price, currency: item.currency, rawNotes: item.rawNotes, brandVoice: item.brandVoice, status: "PROCESSING" } }); const job = await enqueueListingGeneration({ productId: product.id, userId: user.id, imageUrl: item.imageUrl, price: item.price, rawNotes: item.rawNotes, brandVoice: item.brandVoice }); return { productId: product.id, job }; })); return NextResponse.json({ jobs }, { status: 202 }); } catch (error) { if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: 401 }); throw error; } }
