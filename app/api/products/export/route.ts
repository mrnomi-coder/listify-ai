import { NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/auth";
import { productsToShopifyCsv } from "@/lib/csv";
import { prisma } from "@/lib/db";
import { exportSchema } from "@/lib/validators";
export const runtime = "nodejs";
export async function POST(request: Request) { try { const user = await requireUser(); const body = await request.json().catch(() => null); const parsed = exportSchema.safeParse(body); if (!parsed.success) return NextResponse.json({ error: "Select at least one product." }, { status: 400 }); const products = await prisma.product.findMany({ where: { userId: user.id, id: { in: parsed.data.productIds } } }); return new NextResponse(productsToShopifyCsv(products), { headers: { "content-type": "text/csv;charset=utf-8", "content-disposition": "attachment; filename=listify-ai-shopify-export.csv" } }); } catch (error) { if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: 401 }); throw error; } }
