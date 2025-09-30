"use client";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";

interface BuyButtonProps {
  productId: number;
  successRedirect?: string;
}

export const BuyButton = ({ productId, successRedirect }: BuyButtonProps) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    setError(null);
    if (!session?.user) {
      router.push(`/login?redirect=${encodeURIComponent(successRedirect || "/products")}`);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bearer_token")}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to create order");
        setLoading(false);
        return;
      }

      // For now just navigate to /orders or back to product page; payments integration will replace this flow
      router.push("/orders");
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleBuy}
        disabled={loading || isPending}
        className="w-full h-10 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Buy now"}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};