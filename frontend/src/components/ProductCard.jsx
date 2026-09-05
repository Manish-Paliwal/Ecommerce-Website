import { FaStar } from "react-icons/fa6";
import { useCart } from "../context/CartContext";
import { formatINR, localProducts } from "../data/products";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const image = product.image?.startsWith("/images") ? localProducts.find((item) => item.title === product.title)?.image : product.image;
  return <article className="product-card group">
    <div className="product-image"><img src={image || product.image} alt={product.title} /><span className="quick-view">Quick view ↗</span></div>
    <div className="flex items-start justify-between gap-3 pt-4">
      <div><p className="eyebrow">{product.category}</p><h3 className="font-semibold text-ink">{product.title}</h3><p className="text-sm text-muted">{product.color}</p></div>
      <p className="font-bold text-ink">₹{formatINR(product.price)}</p>
    </div>
    <div className="mt-3 flex items-center justify-between"><span className="flex items-center gap-1 text-sm text-muted"><FaStar className="text-amber-500" /> {product.rating}</span><button className={added ? "button button-added" : "button button-dark"} onClick={() => { addItem(product); setAdded(true); window.setTimeout(() => setAdded(false), 1600); }}>{added ? "Added ✓" : "Add to bag"}</button></div>
  </article>;
}