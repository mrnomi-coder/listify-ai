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
3. Install dependencies with `npm install`.
4. Generate Prisma client with `npm run prisma:generate`.
5. Apply the schema with `npm run prisma:migrate`.
6. Start the app with `npm run dev`.
7. Run the worker in a second terminal with `npm run worker` when `REDIS_URL` is configured.

## Codespaces Setup

Open the repo in Codespaces, create `.env.local`, then run:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

## Core Routes

- `/` landing page
- `/dashboard` analytics and pipeline status
- `/generator` single product image-to-listing workflow
- `/bulk-upload` batch image processing queue
- `/listings` product listing table with CSV export controls
- `/shopify` Shopify Admin API connection and publishing readiness
- `/billing` subscription and usage view
- `/settings` brand voice prompts and workspace settings

## API Surface

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/products`
- `POST /api/products`
- `POST /api/products/export`
- `POST /api/ai/generate`
- `POST /api/bulk/jobs`
- `POST /api/import/url`
- `POST /api/upload/sign`
- `POST /api/shopify/connect`
- `POST /api/shopify/publish`
