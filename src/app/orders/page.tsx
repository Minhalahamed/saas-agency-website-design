import { OrdersClient } from "@/components/orders/OrdersClient";

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Your Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">View your recent purchases and their status.</p>
      </div>
      <OrdersClient />
    </div>
  );
}