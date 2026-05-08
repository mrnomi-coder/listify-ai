import type { Prisma } from "@prisma/client";
import { Queue, Worker, type JobsOptions } from "bullmq";
import Redis from "ioredis";
import { generateListingDraft } from "@/lib/ai";
import { prisma } from "@/lib/db";
import type { BrandVoice } from "@/lib/constants";

export type ListingJobPayload = { productId: string; userId: string; imageUrl?: string; price: number; rawNotes?: string; brandVoice: BrandVoice };
const queueName = "listify-ai-generation";
function connection() { return process.env.REDIS_URL ? new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null, enableReadyCheck: false }) : null; }
export function getListingQueue() { const c = connection(); return c ? new Queue<ListingJobPayload>(queueName, { connection: c }) : null; }
async function applyDraft(productId: string, draft: Awaited<ReturnType<typeof generateListingDraft>>) { return prisma.product.update({ where: { id: productId }, data: { name: draft.productName, category: draft.category, commonMarketName: draft.commonMarketName, seoTitle: draft.seoTitle, shortDescription: draft.shortDescription, longDescription: draft.longDescription, bulletFeatures: draft.bulletFeatures, specifications: draft.specifications as Prisma.InputJsonValue, tags: draft.tags, seoKeywords: draft.seoKeywords, competitorNotes: draft.competitorDescriptions as Prisma.InputJsonValue, metaDescription: draft.metaDescription, suggestedCategory: draft.suggestedCategory, confidence: draft.confidence, aiOutput: draft as unknown as Prisma.InputJsonValue, generatedAt: new Date(), status: "READY" } }); }
export async function enqueueListingGeneration(payload: ListingJobPayload, options?: JobsOptions) { const queue = getListingQueue(); if (!queue) { const draft = await generateListingDraft(payload); await applyDraft(payload.productId, draft); return { id: "inline", mode: "inline" as const, draft }; } const job = await queue.add("generate-listing", payload, { attempts: 3, backoff: { type: "exponential", delay: 5000 }, removeOnComplete: 100, removeOnFail: 500, ...options }); return { id: job.id, mode: "queued" as const }; }
export function createListingWorker() { const c = connection(); if (!c) throw new Error("REDIS_URL is required to run the generation worker."); return new Worker<ListingJobPayload>(queueName, async (job) => { await prisma.product.update({ where: { id: job.data.productId }, data: { status: "PROCESSING" } }); const draft = await generateListingDraft(job.data); await applyDraft(job.data.productId, draft); return draft; }, { connection: c, concurrency: 4 }); }
