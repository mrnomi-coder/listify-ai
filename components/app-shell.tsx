"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { appNavigation } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-background"><aside className={cn("fixed inset-y-0 left-0 z-40 w-72 border-r bg-card transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}><div className="flex h-16 items-center justify-between border-b px-5"><Link href="/dashboard" className="flex items-center gap-2 font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground"><Sparkles className="h-4 w-4" /></span>Listify AI</Link><Button aria-label="Close navigation" variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)}><X className="h-4 w-4" /></Button></div><nav className="space-y-1 px-3 py-4">{appNavigation.map((item) => { const Icon = item.icon; const active = pathname === item.href; return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", active && "bg-primary/10 text-primary")}><Icon className="h-4 w-4" />{item.label}</Link>; })}</nav><div className="absolute inset-x-0 bottom-0 border-t p-4"><div className="rounded-lg bg-muted p-4"><p className="text-sm font-medium">Growth plan</p><p className="mt-1 text-xs text-muted-foreground">8,450 AI credits available</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-background"><div className="h-full w-[64%] rounded-full bg-primary" /></div></div></div></aside><div className="lg:pl-72"><header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/88 px-4 backdrop-blur-xl sm:px-6"><Button aria-label="Open navigation" variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen(true)}><Menu className="h-4 w-4" /></Button><div className="relative hidden max-w-md flex-1 md:block"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search listings, SKUs, imports" /></div><div className="ml-auto flex items-center gap-2"><Button aria-label="Notifications" variant="outline" size="icon"><Bell className="h-4 w-4" /></Button><ThemeToggle /></div></header><main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main></div>{open ? <button aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} /> : null}</div>;
}

export function PageHeading({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description: string; actions?: React.ReactNode }) {
  return <div className="mb-6 flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl">{eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p> : null}<h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1><p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{description}</p></div>{actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}</div>;
}
