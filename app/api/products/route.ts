import { NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { productCreateSchema } from "@/lib/validators";
export const runtime = "nodejs";
export async function GET() { try { const user = await requireUser(); const products = await prisma.product.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" }, take: 100 }); return NextResponse.json({ products }); } catch (error) { if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: 401 }); throw error; } }
export async function POST(request: Request) { try { const user = await requireUser(); const body = await request.json().catch(() => null); const parsed = productCreateSchema.safeParse(body); if (!parsed.success) return NextResponse.json({ error: "Invalid product payload." }, { status: 400 }); const product = await prisma.product.create({ data: { userId: user.id, imageUrl: parsed.data.imageUrl, sourceUrl: parsed.data.sourceUrl, price: parsed.data.price, currency: parsed.data.currency, rawNotes: parsed.data.rawNotes, brandVoice: parsed.data.brandVoice, status: "DRAFT" } }); return NextResponse.json({ product }, { status: 201 }); } catch (error) { if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: 401 }); throw error; } }
