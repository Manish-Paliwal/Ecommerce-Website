const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error("Products could not be loaded");
  return response.json();
}

export async function createOrder(order) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!response.ok) throw new Error("Order could not be placed");
  return response.json();
}

export async function authenticate(mode, credentials) {
  const response = await fetch(`${API_URL}/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(credentials) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Authentication failed");
  return data;
}