"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

type OrderItem = {
  id: number;
  userId: number;
  productId: number;
  amountCents: number;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  product: {
    name: string;
    slug: string;
    priceCents: number;
  };
};

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export function OrdersClient() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push(`/login?redirect=${encodeURIComponent("/orders")}`);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bearer_token")}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || "Failed to load orders");
          setOrders([]);
        } else {
          setOrders(data as OrderItem[]);
        }
      } catch (e: any) {
        setError(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, isPending, router]);

  if (isPending || loading) {
    return <div className="p-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-8 text-sm text-red-600">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-8 text-sm text-muted-foreground">
        You have no orders yet. Browse our <Link href="/products" className="underline">products</Link> to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <div key={o.id} className="rounded-lg border p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">
                <Link href={`/products/${o.product.slug}`} className="hover:underline">
                  {o.product.name}
                </Link>
              </div>
              <div className="mt-1 text-xs text-gray-500">Order #{o.id} • {new Date(o.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{formatPrice(o.amountCents)}</div>
              <div className="mt-1 text-xs capitalize text-gray-600">{o.status}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}