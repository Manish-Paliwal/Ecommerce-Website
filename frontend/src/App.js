import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Checkout from './components/Checkout';
import Admin from './components/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
