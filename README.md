# Listify AI

Modern AI SaaS application for Shopify sellers who want to generate, edit, export, and publish product listings from product images, supplier URLs, and rough notes.

## Stack

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS with shadcn-style components
- Prisma and PostgreSQL
- OpenAI Vision and GPT listing generation
- Redis and BullMQ background jobs
- Cloudinary signed uploads
- Shopify Admin API publishing
- HTTP-only cookie auth, route middleware, API rate limiting

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Set `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, and any integration keys you want to test.
3. Install dependencies with `npm.cmd install`.
4. Generate Prisma client with `npm.cmd run prisma:generate`.
5. Apply the schema with `npm.cmd run prisma:migrate`.
6. Start the app with `npm.cmd run dev`.
7. Run the worker in a second terminal with `npm.cmd run worker` when `REDIS_URL` is configured.

The UI includes a polished local experience with demo product data. Authenticated API routes persist real products and generated listings once PostgreSQL is connected.
