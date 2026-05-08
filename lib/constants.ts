import { BarChart3, Box, CloudUpload, CreditCard, LayoutDashboard, Settings, ShoppingBag, Sparkles } from "lucide-react";

export type BrandVoice = "LUXURY" | "MINIMAL" | "TRENDY" | "PREMIUM" | "FASHION" | "TECH";
export const brandVoices: Array<{ value: BrandVoice; label: string; description: string }> = [
  { value: "LUXURY", label: "Luxury", description: "Refined and high-margin." },
  { value: "MINIMAL", label: "Minimal", description: "Clean and direct." },
  { value: "TRENDY", label: "Trendy", description: "Fresh and social-first." },
  { value: "PREMIUM", label: "Premium", description: "Confident quality signals." },
  { value: "FASHION", label: "Fashion", description: "Editorial and style-forward." },
  { value: "TECH", label: "Tech", description: "Precise and capability-led." }
];
export const defaultBrandPrompts: Record<BrandVoice, string> = {
  LUXURY: "Write with polished, sensory language. Emphasize craftsmanship and exclusivity.",
  MINIMAL: "Write concise, calm, clear product copy with no hype.",
  TRENDY: "Write energetic modern copy with social appeal and launch-ready hooks.",
  PREMIUM: "Write confident benefit-led copy with quality signals.",
  FASHION: "Write like an editorial stylist, focusing on fit, texture, and styling.",
  TECH: "Write precise capability-led copy focused on specs and use cases."
};
export const appNavigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generator", label: "Generator", icon: Sparkles },
  { href: "/listings", label: "Listings", icon: Box },
  { href: "/bulk-upload", label: "Bulk Upload", icon: CloudUpload },
  { href: "/shopify", label: "Shopify", icon: ShoppingBag },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings }
];
export const dashboardStats = [
  { label: "Listings generated", value: "1,284", change: "+18.4%", icon: Sparkles },
  { label: "Ready for review", value: "86", change: "+12 today", icon: BarChart3 },
  { label: "Published to Shopify", value: "612", change: "94% success", icon: ShoppingBag },
  { label: "Avg confidence", value: "91%", change: "+6.2%", icon: Box }
];
export const demoProducts = [
  { id: "prod_001", name: "AeroKnit Travel Hoodie", imageUrl: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=800&q=80", price: "88.00", status: "READY", category: "Apparel", confidence: 94, updatedAt: "2 min ago" },
  { id: "prod_002", name: "LumaDock USB-C Hub", imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80", price: "59.00", status: "PROCESSING", category: "Electronics", confidence: 76, updatedAt: "8 min ago" },
  { id: "prod_003", name: "Satin Cloud Pillowcase Set", imageUrl: "https://images.unsplash.com/photo-1616627451515-cbc80e8ece35?auto=format&fit=crop&w=800&q=80", price: "42.00", status: "PUBLISHED", category: "Home", confidence: 96, updatedAt: "24 min ago" },
  { id: "prod_004", name: "Nord Fold Organizer", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", price: "34.00", status: "DRAFT", category: "Accessories", confidence: 81, updatedAt: "1 hr ago" }
];
