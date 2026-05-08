import { z } from "zod";

export const brandVoiceSchema = z.enum(["LUXURY", "MINIMAL", "TRENDY", "PREMIUM", "FASHION", "TECH"]);
export const signupSchema = z.object({ name: z.string().min(2).max(80), email: z.string().email(), password: z.string().min(8).max(128) });
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
export const productCreateSchema = z.object({ imageUrl: z.string().url().optional(), sourceUrl: z.string().url().optional(), price: z.coerce.number().nonnegative(), currency: z.string().length(3).default("USD"), rawNotes: z.string().max(4000).optional(), brandVoice: brandVoiceSchema.default("MINIMAL") });
export const aiGenerateSchema = productCreateSchema.extend({ productId: z.string().optional(), batchMode: z.boolean().default(false) });
export const exportSchema = z.object({ productIds: z.array(z.string()).min(1) });
export const urlImportSchema = z.object({ url: z.string().url(), price: z.coerce.number().nonnegative().default(0), rawNotes: z.string().max(4000).optional(), brandVoice: brandVoiceSchema.default("MINIMAL") });
export const shopifyConnectSchema = z.object({ shop: z.string().min(3), accessToken: z.string().min(10), scopes: z.array(z.string()).default(["write_products", "read_products"]) });
export const shopifyPublishSchema = z.object({ productIds: z.array(z.string()).min(1), shop: z.string().optional() });
