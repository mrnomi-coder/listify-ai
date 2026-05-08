import { AppShell, PageHeading } from "@/components/app-shell";
import { ProductGenerator } from "@/components/product-generator";

export default function GeneratorPage() {
  return <AppShell><PageHeading eyebrow="AI generator" title="Create a Shopify listing" description="Upload a product image, add price and rough notes, then generate editable listing fields in your selected brand voice." /><ProductGenerator /></AppShell>;
}
