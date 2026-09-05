import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import { localProducts, mergeProducts } from "../data/products";
import heroImage from "../assets/hero/shopping.png";
import saleImage from "../assets/hero/sale.png";
import womenImage from "../assets/hero/women.png";

const heroSlides = [
  { eyebrow: "", title: <>Good clothes.<br /><em>Better days.</em></>, copy: "Thoughtful essentials for the way you move through the world. Designed slowly, worn often.", image: heroImage, alt: "New fashion arrivals" },
  { eyebrow: "", title: <>Find your<br /><em>new favorite.</em></>, copy: "Easy layers, expressive details, and pieces made to move with your plans.", image: womenImage, alt: "Women's fashion collection" },
  { eyebrow: "", title: <>Dress for<br /><em>the moment.</em></>, copy: "A fresh edit of considered silhouettes for every version of your day.", image: saleImage, alt: "Seasonal fashion sale" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => { getProducts().then((apiProducts) => setProducts(mergeProducts(apiProducts))).catch(() => setProducts(localProducts)); }, []);
  useEffect(() => { const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 4200); return () => window.clearInterval(timer); }, []);
  const changeSlide = (index) => setActiveSlide((index + heroSlides.length) % heroSlides.length);
  const slide = heroSlides[activeSlide];
  return <>
    <section className="hero-band"><div className="container"><div className="hero-carousel"><div className="hero-grid" key={slide.eyebrow || activeSlide}><div className="hero-copy-wrap">{slide.eyebrow && <p className="eyebrow text-coral">{slide.eyebrow}</p>}<h1>{slide.title}</h1><p className="hero-copy">{slide.copy}</p><Link className="button button-coral" to="/shop">Shop the edit <span>↗</span></Link></div><div className="hero-art"><div className="hero-blob" /><img className="hero-image" src={slide.image} alt={slide.alt} /><div className="hero-spark">✦</div></div></div><div className="hero-controls"><div className="hero-arrows"><button onClick={() => changeSlide(activeSlide - 1)} aria-label="Previous slide">←</button><button onClick={() => changeSlide(activeSlide + 1)} aria-label="Next slide">→</button></div></div></div></div></section>
    <div className="category-rail"><div className="ticker-track"><span>NEW ARRIVALS</span><b>✦</b><span>WOMEN</span><b>✦</b><span>MEN</span><b>✦</b><span>CORE PIECES</span><b>✦</b><span>NEW ARRIVALS</span><b>✦</b><span>WOMEN</span><b>✦</b><span>MEN</span><b>✦</b></div></div>
    <section className="container py-20 reveal" id="story"><div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Pieces with a point of view</h2></div><Link to="/shop" className="underlined-link">View all pieces ↗</Link></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product._id || product.id} product={product} />)}</div></section>
    <section className="story-band reveal"><div className="container story-grid"><p className="eyebrow">OUR PROMISE</p><h2>Less, but<br /><em>more considered.</em></h2><p>We believe your wardrobe should work hard, look good, and last longer than a trend cycle.</p></div></section>
  </>;
}