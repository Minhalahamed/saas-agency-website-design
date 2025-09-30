"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    tagline: "For solo builders and small teams getting started.",
    cta: "Start free",
    features: ["Core automations", "Email support", "Unlimited viewers"],
  },
  {
    name: "Growth",
    price: "$99",
    period: "/mo",
    tagline: "Advanced workflows and analytics for scaling teams.",
    cta: "Try Growth",
    features: ["Everything in Starter", "Advanced analytics", "Role-based access"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "Security, SSO, and support tailored to your org.",
    cta: "Contact sales",
    features: ["SSO & SAML", "Dedicated support", "Audit logs"],
  },
];

const comparison = [
  { label: "Automations", starter: "Basic", growth: "Advanced", enterprise: "Advanced + SLA" },
  { label: "Analytics", starter: "Standard", growth: "Advanced", enterprise: "Custom" },
  { label: "SSO / SAML", starter: "-", growth: "Add-on", enterprise: "Included" },
  { label: "Support", starter: "Email", growth: "Priority", enterprise: "Dedicated" },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Simple, transparent pricing</h1>
        <p className="mt-3 text-muted-foreground">Choose a plan that matches your stage. Upgrade anytime.</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.name} className={p.highlighted ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                <span>{p.name}</span>
                <span className="text-2xl font-semibold">{p.price}<span className="text-sm font-normal text-muted-foreground">{p.period}</span></span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{p.tagline}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />{f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button className="w-full">{p.cta}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-14 overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>Starter</TableHead>
              <TableHead>Growth</TableHead>
              <TableHead>Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparison.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-medium">{row.label}</TableCell>
                <TableCell>{row.starter}</TableCell>
                <TableCell>{row.growth}</TableCell>
                <TableCell>{row.enterprise}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">All prices in USD. Cancel anytime.</p>
    </main>
  );
}