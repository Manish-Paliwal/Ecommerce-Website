import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiSearch, FiMenu, FiUser } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { localProducts } from "../data/products";
import { formatINR } from "../data/products";

export default function StoreNav() {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const suggestions = query.trim() ? localProducts.filter((product) => `${product.title} ${product.category} ${product.color}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4) : [];
  const search = (event) => { event.preventDefault(); navigate(`/shop?search=${encodeURIComponent(query.trim())}`); };
  return <header className="store-nav"><div className="container flex h-20 items-center justify-between gap-6">
    <Link to="/" className="brand"><FiShoppingBag /> Ecommerce<span>.</span></Link>
    <nav className="hidden items-center gap-8 md:flex"><NavLink to="/" end>Home</NavLink><NavLink to="/shop">Shop</NavLink><NavLink to="/story">Our story</NavLink></nav>
    <div className="flex items-center gap-4"><div className="search-wrap hidden sm:block"><form className="search-form" onSubmit={search}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" /><button className="icon-button" aria-label="Submit search"><FiSearch /></button></form>{suggestions.length > 0 && <div className="search-suggestions">{suggestions.map((product) => <button key={product.id} onClick={() => { setQuery(product.title); navigate(`/shop?search=${encodeURIComponent(product.title)}`); }}><span>{product.title}</span><small>{product.category} · ₹{formatINR(product.price)}</small></button>)}</div>}</div><Link className="account-link hidden sm:flex" to="/account"><FiUser /> {user ? user.name.split(" ")[0] : "Account"}</Link><Link className="bag-link" to="/cart" aria-label={`Shopping bag with ${itemCount} items`}><FiShoppingBag /><span>{itemCount}</span></Link><button className="icon-button md:hidden" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><FiMenu /></button></div>
  </div>{menuOpen && <div className="mobile-menu"><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink><NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop all</NavLink><NavLink to="/account" onClick={() => setMenuOpen(false)}>Login / Sign up</NavLink><NavLink to="/story" onClick={() => setMenuOpen(false)}>Our story</NavLink><form className="mobile-search" onSubmit={search}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" /><button className="button button-dark" type="submit">Search</button></form></div>}</header>;
}