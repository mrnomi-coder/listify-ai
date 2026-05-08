import { Download, Send } from "lucide-react";
import { AppShell, PageHeading } from "@/components/app-shell";
import { ListingsTable } from "@/components/listings-table";
import { Button } from "@/components/ui";

export default function ListingsPage() {
  return <AppShell><PageHeading eyebrow="Catalog" title="Product listings" description="Edit generated content, track draft and published states, and move selected products into Shopify." actions={<><Button variant="outline"><Download className="h-4 w-4" />Export</Button><Button><Send className="h-4 w-4" />Publish</Button></>} /><ListingsTable /></AppShell>;
}
