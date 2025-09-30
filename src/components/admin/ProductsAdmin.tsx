"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth-client";

type Product = {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  priceCents: number;
  image?: string | null;
  features?: string[] | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((cents || 0) / 100);
}

export function ProductsAdmin() {
  const { data: session } = useSession();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    name: "",
    description: "",
    price_cents: "",
    image: "",
    features: "",
  });
  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("bearer_token") : null), []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/products?limit=50&search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to load products");
        setItems([]);
      } else {
        setItems(data as Product[]);
      }
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Missing auth token. Please log in again.");
      return;
    }
    setCreating(true);
    setError(null);
    try {
      const payload: any = {
        slug: form.slug.trim(),
        name: form.name.trim(),
        description: form.description.trim(),
        price_cents: Number(form.price_cents),
        image: form.image.trim() || null,
      };
      const features = form.features
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (features.length) payload.features = features;

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to create product");
        return;
      }
      setForm({ slug: "", name: "", description: "", price_cents: "", image: "", features: "" });
      await fetchProducts();
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (id: number, updates: Partial<Product> & { price_cents?: number }) => {
    if (!token) {
      setError("Missing auth token. Please log in again.");
      return;
    }
    try {
      const body: any = {};
      if (updates.slug !== undefined) body.slug = updates.slug;
      if (updates.name !== undefined) body.name = updates.name;
      if (updates.description !== undefined) body.description = updates.description;
      if (updates.price_cents !== undefined) body.price_cents = updates.price_cents;
      if (updates.image !== undefined) body.image = updates.image;
      if (updates.features !== undefined) body.features = updates.features;

      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to update product");
        return;
      }
      await fetchProducts();
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      setError("Missing auth token. Please log in again.");
      return;
    }
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to delete product");
        return;
      }
      await fetchProducts();
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-medium">Products</h2>
          <p className="text-sm text-muted-foreground">Create, edit, and remove products.</p>
        </div>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-9 w-56 rounded-md border px-3 text-sm"
          />
          <button onClick={fetchProducts} className="h-9 rounded-md bg-gray-900 px-3 text-sm text-white hover:bg-gray-800">Search</button>
        </div>
      </div>

      {error && <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleCreate} className="grid gap-3 rounded-lg border bg-white p-4 sm:grid-cols-2 lg:grid-cols-6">
        <input
          required
          value={form.slug}
          onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))}
          placeholder="slug"
          className="h-9 rounded-md border px-3 text-sm lg:col-span-1"
        />
        <input
          required
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          placeholder="name"
          className="h-9 rounded-md border px-3 text-sm lg:col-span-1"
        />
        <input
          required
          value={form.price_cents}
          onChange={(e) => setForm((s) => ({ ...s, price_cents: e.target.value }))}
          placeholder="price (cents)"
          className="h-9 rounded-md border px-3 text-sm lg:col-span-1"
        />
        <input
          value={form.image}
          onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))}
          placeholder="image URL"
          className="h-9 rounded-md border px-3 text-sm lg:col-span-1"
        />
        <input
          value={form.features}
          onChange={(e) => setForm((s) => ({ ...s, features: e.target.value }))}
          placeholder="features (comma separated)"
          className="h-9 rounded-md border px-3 text-sm lg:col-span-2"
        />
        <input
          value={form.description}
          onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          placeholder="description"
          className="h-9 rounded-md border px-3 text-sm lg:col-span-6"
        />
        <div className="lg:col-span-6 flex justify-end">
          <button disabled={creating} className="h-9 rounded-md bg-gray-900 px-4 text-sm text-white hover:bg-gray-800 disabled:opacity-50">
            {creating ? "Creating..." : "Create product"}
          </button>
        </div>
      </form>

      <div className="rounded-lg border bg-white">
        <div className="grid grid-cols-12 gap-3 border-b px-4 py-2 text-xs font-medium text-muted-foreground">
          <div className="col-span-2">Name</div>
          <div className="col-span-2">Slug</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {loading ? (
          <div className="p-4 text-sm">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">No products found.</div>
        ) : (
          <ul className="divide-y">
            {items.map((p) => (
              <li key={p.id} className="grid grid-cols-12 items-start gap-3 px-4 py-3">
                <input
                  defaultValue={p.name}
                  onBlur={(e) => e.target.value !== p.name && handleUpdate(p.id, { name: e.target.value })}
                  className="col-span-2 h-9 rounded-md border px-2 text-sm"
                />
                <input
                  defaultValue={p.slug}
                  onBlur={(e) => e.target.value !== p.slug && handleUpdate(p.id, { slug: e.target.value })}
                  className="col-span-2 h-9 rounded-md border px-2 text-sm"
                />
                <input
                  defaultValue={String(p.priceCents)}
                  onBlur={(e) => {
                    const v = Number(e.target.value);
                    if (!Number.isNaN(v) && v !== p.priceCents) handleUpdate(p.id, { price_cents: v });
                  }}
                  className="col-span-2 h-9 rounded-md border px-2 text-sm"
                />
                <input
                  defaultValue={p.description || ""}
                  onBlur={(e) => e.target.value !== (p.description || "") && handleUpdate(p.id, { description: e.target.value })}
                  className="col-span-4 h-9 rounded-md border px-2 text-sm"
                />
                <div className="col-span-2 flex justify-end gap-2">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="h-9 rounded-md border px-3 text-sm hover:bg-gray-50"
                  >
                    Delete
                  </button>
                  <a
                    href={`/products/${p.slug}`}
                    className="h-9 rounded-md bg-gray-900 px-3 text-sm text-white hover:bg-gray-800 grid place-items-center"
                  >
                    View
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}