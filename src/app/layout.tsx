import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Nav from "@/components/site/Nav";
import CustomAutumnProvider from "@/lib/autumn-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Nimbus SaaS – Launch faster with a modern, scalable platform",
  description:
    "A modern SaaS platform for teams to launch, scale, and automate their workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Nav />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <CustomAutumnProvider>
          {children}
        </CustomAutumnProvider>
        <Toaster />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}