"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      teamSize: formData.get("teamSize") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit demo request");
      }

      setSubmitted(true);
      toast.success("Demo request submitted! We'll be in touch shortly.");
    } catch (error) {
      console.error("Error submitting demo request:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit demo request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-semibold">Request a demo</h1>
          <p className="mt-3 text-muted-foreground">
            Tell us a bit about your team and goals. We'll follow up with a tailored walkthrough and next steps.
          </p>
          <div className="mt-8 grid gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded bg-primary" />
              <p>Personalized 15–30 minute session</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded bg-primary" />
              <p>No pressure, no commitment</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded bg-primary" />
              <p>We'll recommend the best plan for your needs</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tell us about you</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="rounded-md border bg-secondary p-4 text-sm">
                Thanks! We'll be in touch shortly. If you need immediate help, email support@nimbus.app
              </div>
            ) : (
              <form className="grid gap-4" onSubmit={onSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" name="name" placeholder="Jamie Doe" required disabled={isLoading} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@company.com" required disabled={isLoading} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Acme Inc." disabled={isLoading} />
                </div>
                <div className="grid gap-2">
                  <Label>Team size</Label>
                  <Select name="teamSize" disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1–10</SelectItem>
                      <SelectItem value="11-50">11–50</SelectItem>
                      <SelectItem value="51-200">51–200</SelectItem>
                      <SelectItem value="200+">200+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">What are you hoping to achieve?</Label>
                  <Textarea id="message" name="message" placeholder="Share context, goals, and timeline…" rows={4} disabled={isLoading} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Request demo"}
                </Button>
                <p className="text-xs text-muted-foreground">By requesting a demo, you agree to our terms and privacy policy.</p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}