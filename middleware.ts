import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";
const protectedRoutes = ["/dashboard", "/listings", "/generator", "/bulk-upload", "/settings", "/shopify", "/billing"];
function isProtected(pathname: string) { return protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)); }
export async function middleware(request: NextRequest) { if (!isProtected(request.nextUrl.pathname)) return NextResponse.next(); const token = request.cookies.get("listify_session")?.value; const secret = process.env.AUTH_SECRET; if (!token || !secret) { const loginUrl = new URL("/login", request.url); loginUrl.searchParams.set("next", request.nextUrl.pathname); return NextResponse.redirect(loginUrl); } try { await jwtVerify(token, new TextEncoder().encode(secret)); return NextResponse.next(); } catch { const loginUrl = new URL("/login", request.url); loginUrl.searchParams.set("next", request.nextUrl.pathname); return NextResponse.redirect(loginUrl); } }
export const config = { matcher: ["/dashboard/:path*", "/listings/:path*", "/generator/:path*", "/bulk-upload/:path*", "/settings/:path*", "/shopify/:path*", "/billing/:path*"] };
