"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Zap, Rocket, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2000&auto=format&fit=crop"
            alt="Hero background"
            fill
            className="object-cover opacity-15"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">New • Launch faster</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Run your product, not your plumbing
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:mt-6 sm:text-lg">
              Nimbus is the modern SaaS platform that helps teams automate ops, ship faster, and scale with confidence.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link href="/contact"><Button size="lg" className="w-full sm:w-auto">Book a live demo</Button></Link>
              <Link href="/pricing"><Button size="lg" variant="secondary" className="w-full sm:w-auto">See pricing</Button></Link>
            </div>
            {/* Headline variations - hidden on mobile */}
            <div className="mt-6 text-sm text-muted-foreground hidden lg:block">
              <p className="font-medium">Headline variations:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Automate the busywork. Accelerate the work that matters.</li>
                <li>From idea to impact—launch, learn, and scale on one platform.</li>
                <li>Ship confidently with a platform built for speed and clarity.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">Trusted by product-first teams</p>
          <div className="mt-6 grid grid-cols-3 gap-4 opacity-80 sm:grid-cols-4 md:grid-cols-6 sm:gap-6">
            {[
              "vercel", "stripe", "notion", "linear", "figma", "supabase",
            ].map((brand) => (
              <div key={brand} className="flex items-center justify-center">
                <div className="h-4 w-16 rounded bg-muted sm:h-6 sm:w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value pillars */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {[
              { icon: Rocket, title: "Launch faster", desc: "Blueprints and automations that get you to market days—not months—so you can focus on your product." },
              { icon: Shield, title: "Secure by default", desc: "Best-practice security, SSO, and audit logs built-in so compliance is never an afterthought." },
              { icon: BarChart3, title: "Clarity at scale", desc: "Real-time dashboards and alerts that keep teams aligned as your customer base grows." },
            ].map((f) => (
              <Card key={f.title}>
                <CardHeader className="flex flex-row items-center gap-3">
                  <f.icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">{f.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-8">
          <h2 className="text-xl font-semibold sm:text-2xl">See Nimbus in action</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">Book a 15-minute walkthrough tailored to your workflow.</p>
          <div className="mt-6">
            <Link href="/contact"><Button size="lg">Request demo</Button></Link>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">No credit card required • Cancel anytime</div>
        </div>
      </section>

      {/* Feature preview */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="text-2xl font-semibold sm:text-3xl">Everything you need to build momentum</h3>
              <ul className="mt-6 space-y-3 text-sm sm:text-base">
                {["Automated onboarding", "Workflow orchestration", "Powerful analytics", "Developer-friendly APIs"].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary sm:h-5 sm:w-5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/features"><Button className="w-full sm:w-auto">Explore features</Button></Link>
                <Link href="/pricing"><Button variant="secondary" className="w-full sm:w-auto">Compare plans</Button></Link>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1551281044-8d8d6aa0dfaf?q=80&w=1600&auto=format&fit=crop"
                alt="App preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h3 className="text-center text-xl font-semibold sm:text-2xl">What teams say</h3>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "Nimbus cut our launch time in half and gave us clear visibility from day one.",
                name: "Alex Chen",
                role: "Head of Product, Halo AI",
              },
              {
                quote:
                  "We automated the busywork and refocused the team on customer value.",
                name: "Priya Nair",
                role: "COO, Arc Labs",
              },
              {
                quote:
                  "Rock-solid security and beautiful analytics—exactly what we needed to scale.",
                name: "Samir Patel",
                role: "CTO, Northwind",
              },
            ].map((t) => (
              <Card key={t.name}>
                <CardContent className="pt-6">
                  <p className="text-sm">"{t.quote}"</p>
                  <p className="mt-4 text-xs text-muted-foreground">{t.name} • {t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}