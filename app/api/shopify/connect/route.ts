import { NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { encryptSecret } from "@/lib/secrets";
import { shopifyConnectSchema } from "@/lib/validators";
export const runtime = "nodejs";
function normalizeShop(value: string) { const trimmed = value.trim().replace(/^https?:\/\//, "").replace(/\/$/, ""); return trimmed.includes(".myshopify.com") ? trimmed : `${trimmed}.myshopify.com`; }
export async function POST(request: Request) { try { const user = await requireUser(); const body = await request.json().catch(() => null); const parsed = shopifyConnectSchema.safeParse(body); if (!parsed.success) return NextResponse.json({ error: "Invalid Shopify connection payload." }, { status: 400 }); const shop = normalizeShop(parsed.data.shop); const connection = await prisma.shopifyConnection.upsert({ where: { userId_shop: { userId: user.id, shop } }, create: { userId: user.id, shop, accessTokenCipher: encryptSecret(parsed.data.accessToken), scopes: parsed.data.scopes, isActive: true }, update: { accessTokenCipher: encryptSecret(parsed.data.accessToken), scopes: parsed.data.scopes, isActive: true }, select: { id: true, shop: true, scopes: true, isActive: true, updatedAt: true } }); return NextResponse.json({ connection }); } catch (error) { if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: 401 }); throw error; } }
