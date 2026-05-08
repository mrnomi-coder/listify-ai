# Codespaces

After the codespace opens:

1. Copy `.env.example` to `.env.local`.
2. Fill `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, and any API keys.
3. Run:

```bash
npm run prisma:migrate
npm run dev
```

For production-like local services, attach PostgreSQL and Redis from your preferred Codespaces setup or external providers such as Neon/Supabase and Upstash.
