import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import StoreNav from "./components/StoreNav";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Story from "./pages/Story";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash]);
  return null;
}

const App = () => {
  const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");
  return <BrowserRouter basename={basename}><ScrollToTop /><AuthProvider><CartProvider><StoreNav /><Routes><Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="/account" element={<Account />} /><Route path="/story" element={<Story />} /><Route path="*" element={<Home />} /></Routes><footer className="site-footer"><div className="container flex flex-col justify-between gap-4 sm:flex-row"><strong>Ecommerce.</strong><span>Thoughtful clothes for ordinary days.</span></div></footer></CartProvider></AuthProvider></BrowserRouter>;
};

export default App;
