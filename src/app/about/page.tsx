"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const team = [
  {
    name: "Elena Park",
    role: "CEO & Co‑founder",
    img:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    initials: "EP",
  },
  {
    name: "Marcus Hill",
    role: "CTO",
    img:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
    initials: "MH",
  },
  {
    name: "Sofia Alvarez",
    role: "Head of Product",
    img:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
    initials: "SA",
  },
  {
    name: "Dylan Kim",
    role: "Design Lead",
    img:
      "https://images.unsplash.com/photo-1541534401786-2077eed87a6f?q=80&w=1200&auto=format&fit=crop",
    initials: "DK",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      {/* Intro */}
      <div className="max-w-2xl">
        <Badge>Our story</Badge>
        <h1 className="mt-3 text-3xl font-semibold">Building tools that let teams move faster</h1>
        <p className="mt-3 text-muted-foreground">
          Nimbus started with a simple idea: product teams should spend their time on customer value, not
          operational overhead. Today, we help companies automate workflows, align teams, and scale with
          confidence.
        </p>
      </div>

      {/* Story + image */}
      <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?q=80&w=1600&auto=format&fit=crop"
            alt="Team collaborating"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Why we exist</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            We believe great software is built by teams who can focus. Nimbus removes busywork by combining
            automations, insights, and collaboration in one place—so you can ship faster and stay in control.
          </p>
          <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {[
              "Customer-first decisions",
              "Security by default",
              "Clarity through data",
              "Momentum over complexity",
            ].map((v) => (
              <li key={v} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" /> {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Team */}
      <section className="mt-16">
        <h3 className="text-xl font-semibold">Meet the team</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <Card key={m.name}>
              <CardHeader className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={m.img} alt={m.name} />
                  <AvatarFallback>{m.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base leading-tight">{m.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                Passionate about building products people love.
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mt-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Trust", desc: "We earn trust by delivering reliably and communicating clearly." },
            { title: "Craft", desc: "We sweat the details to make complex workflows simple." },
            { title: "Momentum", desc: "We bias toward action and continuous improvement." },
          ].map((v) => (
            <Card key={v.title}>
              <CardHeader>
                <CardTitle className="text-base">{v.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">{v.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}