import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";
import { formatINR } from "../data/products";

export default function Checkout() { const { items, total } = useCart(); const navigate = useNavigate(); const [form, setForm] = useState({ name: "", email: "", address: "" }); const [status, setStatus] = useState("");
  const submit = async (event) => { event.preventDefault(); setStatus("Sending..."); try { await createOrder({ customer: form, items, total }); setStatus("Order placed. Thank you."); setTimeout(() => navigate("/"), 1200); } catch { setStatus("The store is offline. Please start the API server and try again."); } };
  return <main className="container py-16"><p className="eyebrow">CHECKOUT</p><h1 className="page-title">Make it yours.</h1><form className="checkout-form" onSubmit={submit}>{["name", "email", "address"].map((field) => <label key={field}>{field}<input required type={field === "email" ? "email" : "text"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} /></label>)}<div className="summary-row"><span>Total</span><strong>₹{formatINR(total)}</strong></div><button className="button button-coral" type="submit">Place order ↗</button>{status && <p className="text-sm text-muted">{status}</p>}</form></main>;
}