import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image || 'https://via.placeholder.com/300x200'} alt={product.name} className="card-img" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`} className="card-title">{product.name}</Link>
        <div className="card-price">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}
