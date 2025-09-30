"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import { ProductsAdmin } from "@/components/admin/ProductsAdmin";

export default function AdminPage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/admin");
    }
  }, [session, isPending, router]);

  if (isPending) return <div className="p-8">Loading...</div>;
  if (!session?.user) return null;

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token");
    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    if (!error?.code) {
      localStorage.removeItem("bearer_token");
      refetch();
      router.push("/");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <button onClick={handleSignOut} className="px-3 h-9 rounded-md bg-gray-900 text-white hover:bg-gray-800">
          Sign out
        </button>
      </div>

      {/* Products management */}
      <div className="rounded-lg border border-gray-200 p-6 bg-white">
        {/* Replace placeholder with ProductsAdmin */}
        <ProductsAdmin />
      </div>
    </div>
  );
}