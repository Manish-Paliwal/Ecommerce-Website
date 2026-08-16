import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts(search) {
    try {
      const params = {};
      if (search) params.search = search;
      const { data } = await API.get('/products', { params });
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load products');
    }
  }

  function onSearch(e) {
    e.preventDefault();
    fetchProducts(q);
  }

  return (
    <div>
      <form onSubmit={onSearch} className="search-form">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products..." />
        <button type="submit">Search</button>
      </form>

      <div className="grid">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
