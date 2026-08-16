import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { Store } from '../context/Store';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data)).catch(err => console.error(err));
  }, [id]);

  function addToCart() {
    if (!product) return;
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: Number(qty)
      }
    });
    navigate('/cart');
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-page">
      <img src={product.image || 'https://via.placeholder.com/400x300'} alt={product.name} className="product-img" />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="price">${product.price.toFixed(2)}</div>
        <div>
          <label>Qty: </label>
          <select value={qty} onChange={e => setQty(e.target.value)}>
            {Array.from({ length: Math.min(10, (product.countInStock || 10)) }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <button onClick={addToCart} className="btn">Add to cart</button>
      </div>
    </div>
  );
}
