import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BuyButton } from "@/components/shop/BuyButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

async function getProduct(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/products/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <nav className="mx-auto max-w-7xl px-4 py-3 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Main Product Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-xl border bg-muted">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-6xl sm:text-7xl lg:text-8xl">🧩</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div>
              <Badge className="mb-3">Digital Product</Badge>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{product.name}</h1>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-3xl font-bold sm:text-4xl">{formatPrice(product.priceCents)}</p>
                <span className="text-sm text-muted-foreground">one-time payment</span>
              </div>
            </div>

            {product.description && (
              <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">{product.description}</p>
            )}

            {/* Features */}
            {Array.isArray(product.features) && product.features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">What's included</h2>
                <ul className="space-y-3">
                  {product.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Buy Button */}
            <div className="mt-8 lg:mt-auto">
              <BuyButton productId={product.id} successRedirect={`/products/${product.slug}`} />
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <RefreshCw className="h-4 w-4 text-primary" />
                <span>Instant delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Headphones className="h-4 w-4 text-primary" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Secure Purchase</h3>
                </div>
                <p className="text-sm text-muted-foreground">Your payment information is encrypted and secure with industry-standard SSL protection.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Instant Access</h3>
                </div>
                <p className="text-sm text-muted-foreground">Get immediate access to your purchase. Download and start using right away.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Headphones className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Expert Support</h3>
                </div>
                <p className="text-sm text-muted-foreground">Our dedicated support team is here to help you with any questions or issues.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 rounded-2xl border bg-secondary p-8 sm:p-10 lg:p-12 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Ready to get started?</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust our products to power their business.
          </p>
          <div className="mt-6">
            <Link href="/contact" className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}