import women from "../assets/women/women.png";
import women2 from "../assets/women/women2.jpg";
import women3 from "../assets/women/women3.jpg";
import women4 from "../assets/women/women4.jpg";
import shirt from "../assets/shirt/shirt.png";
import shirt2 from "../assets/shirt/shirt2.png";
import shirt3 from "../assets/shirt/shirt3.png";

export const localProducts = [
  { id: "1", title: "Linen Edit Shirt", category: "Men", price: 3699, rating: 4.9, color: "Ivory", image: shirt },
  { id: "2", title: "Relaxed Cotton Shirt", category: "Men", price: 3199, rating: 4.7, color: "Sky", image: shirt2 },
  { id: "3", title: "Everyday Overshirt", category: "Men", price: 4299, rating: 4.8, color: "Sage", image: shirt3 },
  { id: "4", title: "Embroidered Kurta", category: "Women", price: 5599, rating: 5, color: "White", image: women },
  { id: "5", title: "Studio Wrap Dress", category: "Women", price: 6299, rating: 4.6, color: "Coral", image: women2 },
  { id: "6", title: "Pleated Day Dress", category: "Women", price: 5199, rating: 4.7, color: "Rose", image: women3 },
  { id: "7", title: "Printed Summer Dress", category: "Women", price: 4799, rating: 4.5, color: "Sun", image: women4 },
  { id: "8", title: "Minimal Linen Blazer", category: "Men", price: 7799, rating: 4.8, color: "Stone", image: shirt },
  { id: "9", title: "Soft Utility Jacket", category: "Men", price: 7299, rating: 4.6, color: "Olive", image: shirt2 },
  { id: "10", title: "Satin Evening Top", category: "Women", price: 3999, rating: 4.9, color: "Blue", image: women3 },
  { id: "11", title: "Relaxed Pleat Trousers", category: "Women", price: 5999, rating: 4.7, color: "Black", image: women4 },
  { id: "12", title: "Weekend Layer Set", category: "Kids", price: 3499, rating: 4.5, color: "Sky", image: shirt3 },
  { id: "13", title: "Canvas Crossbody Bag", category: "Accessories", price: 2999, rating: 4.4, color: "Ivory", image: shirt },
];

export function mergeProducts(apiProducts = []) {
  const apiTitles = new Set(apiProducts.map((product) => product.title));
  const legacyPrices = { 36: 2999, 38: 3199, 42: 3499, 44: 3699, 48: 3999, 52: 4299, 58: 4799, 62: 5199, 68: 5599, 72: 5999, 76: 6299, 88: 7299, 94: 7799 };
  const normalizedApiProducts = apiProducts.map((product) => ({ ...product, price: legacyPrices[product.price] || product.price }));
  return [...normalizedApiProducts, ...localProducts.filter((product) => !apiTitles.has(product.title))];
}

export function formatINR(value) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}