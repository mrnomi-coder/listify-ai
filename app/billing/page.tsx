import { CheckCircle2, CreditCard } from "lucide-react";
import { AppShell, PageHeading } from "@/components/app-shell";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const plans = [
  { name: "Starter", price: "$29", badge: "Current", features: ["500 AI listings", "CSV export", "Basic brand voices", "Email support"] },
  { name: "Growth", price: "$79", badge: "Popular", features: ["2,500 AI listings", "Shopify API publish", "Bulk queues", "URL imports"] },
  { name: "Scale", price: "$199", badge: "Advanced", features: ["10,000 AI listings", "Priority workers", "Team roles", "Custom prompts"] }
];
export default function BillingPage() {
  return <AppShell><PageHeading eyebrow="Subscription" title="Billing" description="Track AI credits, subscription limits, and plan features for production catalog operations." actions={<Button><CreditCard className="h-4 w-4" />Manage billing</Button>} /><div className="grid gap-5 lg:grid-cols-3">{plans.map((plan) => <Card key={plan.name} className={plan.name === "Growth" ? "border-primary shadow-soft" : ""}><CardHeader className="flex flex-row items-center justify-between"><CardTitle>{plan.name}</CardTitle><Badge variant={plan.name === "Growth" ? "default" : "secondary"}>{plan.badge}</Badge></CardHeader><CardContent><p className="text-4xl font-semibold">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p><div className="mt-6 grid gap-3">{plan.features.map((feature) => <div key={feature} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" />{feature}</div>)}</div><Button className="mt-6 w-full" variant={plan.name === "Growth" ? "default" : "outline"}>{plan.name === "Starter" ? "Current plan" : "Choose plan"}</Button></CardContent></Card>)}</div></AppShell>;
}
