"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession, authClient } from "@/lib/auth-client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("bearer_token") : "";
    const { error } = await authClient.signOut({
      fetchOptions: { headers: { Authorization: `Bearer ${token}` } },
    });
    if (!error?.code) {
      localStorage.removeItem("bearer_token");
      refetch();
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="inline-block h-6 w-6 rounded bg-primary" />
            <span className="text-sm sm:text-base">Nimbus SaaS</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
            {!isPending && session?.user && (
              <Link
                href="/admin"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/admin" ? "text-foreground" : "text-foreground/60"
                )}
              >
                Admin
              </Link>
            )}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {!isPending && session?.user ? (
              <Button size="sm" variant="outline" onClick={handleSignOut}>
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button size="sm" variant="outline">Login</Button>
              </Link>
            )}
            <Link href="/contact">
              <Button size="sm">Book a Demo</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-2 py-2 text-sm transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground font-medium" : "text-foreground/60"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {!isPending && session?.user && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-2 py-2 text-sm transition-colors hover:text-foreground/80",
                    pathname === "/admin" ? "text-foreground font-medium" : "text-foreground/60"
                  )}
                >
                  Admin
                </Link>
              )}
              <div className="pt-3 border-t flex flex-col gap-2">
                {!isPending && session?.user ? (
                  <Button size="sm" variant="outline" onClick={handleSignOut} className="w-full">
                    Logout
                  </Button>
                ) : (
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" variant="outline" className="w-full">Login</Button>
                  </Link>
                )}
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">Book a Demo</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}