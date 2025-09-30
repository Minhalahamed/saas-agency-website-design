"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Code2, BarChart3, Users2, Database } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Automation engine",
    desc: "Trigger actions, schedule jobs, and orchestrate workflows without writing glue code.",
  },
  {
    icon: BarChart3,
    title: "Analytics & reporting",
    desc: "Real-time KPIs and custom dashboards to track adoption, performance, and ROI.",
  },
  {
    icon: Shield,
    title: "Security & compliance",
    desc: "SSO, role-based access, audit logs, and encryption—secure by default.",
  },
  {
    icon: Users2,
    title: "Collaboration",
    desc: "Comments, mentions, and approvals keep everyone aligned and moving.",
  },
  {
    icon: Database,
    title: "Integrations",
    desc: "Connect to your data sources and tools with native connectors and webhooks.",
  },
  {
    icon: Code2,
    title: "Developer-friendly",
    desc: "Clean APIs, SDKs, and webhooks make customization straightforward.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="max-w-2xl">
        <Badge>Product</Badge>
        <h1 className="mt-3 text-3xl font-semibold">Features that build momentum</h1>
        <p className="mt-3 text-muted-foreground">
          A concise set of capabilities designed to remove friction and help your team ship with confidence.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title}>
            <CardHeader className="flex flex-row items-center gap-3">
              <f.icon className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-muted-foreground">{f.desc}</CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}