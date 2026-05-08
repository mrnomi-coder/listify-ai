"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@/components/ui";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isRegister = mode === "register";
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/auth/${isRegister ? "signup" : "login"}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: form.get("name"), email: form.get("email"), password: form.get("password") }) });
    setLoading(false);
    if (!response.ok) { const payload = await response.json().catch(() => null) as { error?: string } | null; setError(payload?.error ?? "Unable to continue."); return; }
    router.push("/dashboard");
  }
  return <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10"><div className="w-full max-w-md"><Link href="/" className="mx-auto mb-6 flex w-fit items-center gap-2 font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground"><Sparkles className="h-4 w-4" /></span>Listify AI</Link><Card><CardHeader><CardTitle>{isRegister ? "Create your workspace" : "Welcome back"}</CardTitle></CardHeader><CardContent><form className="space-y-4" onSubmit={submit}>{isRegister ? <label className="space-y-2 text-sm font-medium">Name<Input name="name" required minLength={2} autoComplete="name" /></label> : null}<label className="space-y-2 text-sm font-medium">Email<Input name="email" type="email" required autoComplete="email" /></label><label className="space-y-2 text-sm font-medium">Password<Input name="password" type="password" required minLength={isRegister ? 8 : 1} autoComplete={isRegister ? "new-password" : "current-password"} /></label>{error ? <p className="text-sm text-destructive">{error}</p> : null}<Button className="w-full" disabled={loading}>{loading ? "Working..." : isRegister ? "Create account" : "Sign in"}</Button></form><p className="mt-5 text-center text-sm text-muted-foreground">{isRegister ? "Already have an account?" : "New to Listify AI?"} <Link className="font-medium text-primary" href={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create one"}</Link></p></CardContent></Card></div></div>;
}
