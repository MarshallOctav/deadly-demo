export type Order = {
  id: string;
  userId: string | null;
  items: { slug: string; title: string; price: number; qty: number }[];
  total: number;
  buyer: { name: string; email: string; phone: string };
  payment: string;
  status: "pending" | "processing" | "paid" | "failed";
  createdAt: number;
  paidAt?: number;
  submittedAt?: number;
  proofImage?: string;
  gateway?: {
    provider: string;
    transactionId: string;
    reference: string;
    channel: string;
    note: string;
  };
};

const ORDERS_KEY = "Deadly:orders";

export function readOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]") as Order[];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const all = readOrders();
  const index = all.findIndex((item) => item.id === order.id);
  if (index >= 0) all[index] = order;
  else all.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(all));
}

export function getOrder(id: string) {
  return readOrders().find((order) => order.id === id);
}

