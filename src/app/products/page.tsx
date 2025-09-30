import Link from "next/link";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/products`, {
    // Let Next.js cache at build and revalidate periodically
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    return [] as Array<any>;
  }
  return (await res.json()) as Array<{ id: number; slug: string; name: string; priceCents: number; image?: string | null }>;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-8">
        <h1 className="text-3xl font-semibold">Products</h1>
        <p className="text-sm text-gray-600">Software tools you can buy instantly</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="rounded-lg border border-gray-200 bg-white overflow-hidden flex flex-col">
            <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-400">
              {/* Use existing asset if provided; otherwise fallback block */}
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-5xl">🧩</span>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-medium mb-1">{p.name}</h2>
              <p className="text-gray-900 font-semibold mb-4">{formatPrice(p.priceCents)}</p>
              <div className="mt-auto">
                <Link href={`/products/${p.slug}`} className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-gray-900 text-white hover:bg-gray-800">
                  View details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}