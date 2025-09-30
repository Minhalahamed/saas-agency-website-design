import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BuyButton } from "@/components/shop/BuyButton";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

async function getProduct(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/products/${slug}`, {
    // Cache with revalidation for SSG-like behavior
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-sm mb-6 text-muted-foreground">
        <Link href="/products" className="hover:underline">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border bg-muted">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl">🧩</div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-lg font-medium">{formatPrice(product.priceCents)}</p>
          {product.description && (
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{product.description}</p>
          )}

          {Array.isArray(product.features) && product.features.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-medium">What's included</h2>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {product.features.map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 max-w-sm">
            <BuyButton productId={product.id} successRedirect={`/products/${product.slug}`} />
          </div>
        </div>
      </div>
    </div>
  );
}