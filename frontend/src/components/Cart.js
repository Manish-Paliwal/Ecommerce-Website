import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';

export default function Cart() {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();
  const items = state.cart.cartItems;

  function removeItem(productId) {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  }

  function updateQty(productId, qty) {
    const item = items.find(i => i.product === productId);
    if (!item) return;
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, qty: Number(qty) } });
  }

  function proceed() {
    navigate('/checkout');
  }

  const total = items.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    <div>
      <h2>Your cart</h2>
      {items.length === 0 ? (
        <div>
          Cart is empty. <Link to="/">Go shopping</Link>
        </div>
      ) : (
        <div>
          <ul className="cart-list">
            {items.map(i => (
              <li key={i.product} className="cart-item">
                <img src={i.image || 'https://via.placeholder.com/80'} alt={i.name} />
                <div style={{ flex: 1 }}>
                  <Link to={`/product/${i.product}`}>{i.name}</Link>
                  <div>${i.price.toFixed(2)}</div>
                </div>
                <select value={i.qty} onChange={e => updateQty(i.product, e.target.value)}>
                  {Array.from({ length: 10 }, (_, k) => k + 1).map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <button onClick={() => removeItem(i.product)} className="link-button">Remove</button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div>Total: ${total.toFixed(2)}</div>
            <button onClick={proceed} className="btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
