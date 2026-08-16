import React, { useContext, useState } from 'react';
import { Store } from '../context/Store';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { state, dispatch } = useContext(Store);
  const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: '' });
  const navigate = useNavigate();

  const total = state.cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  async function submitOrder(e) {
    e.preventDefault();
    if (!state.user) {
      return navigate('/login');
    }
    try {
      const token = state.user.token;
      const res = await API.post('/orders', {
        orderItems: state.cart.cartItems,
        shippingAddress: address,
        paymentMethod: 'Offline',
        totalPrice: total
      }, { headers: { Authorization: 'Bearer ' + token }});
      dispatch({ type: 'CLEAR_CART' });
      alert('Order placed. Order id: ' + res.data._id);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  }

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={submitOrder} className="checkout-form">
        <input required placeholder="Address" value={address.address} onChange={e => setAddress({ ...address, address: e.target.value })} />
        <input required placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
        <input required placeholder="Postal Code" value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} />
        <input required placeholder="Country" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} />
        <div>Total: ${total.toFixed(2)}</div>
        <button type="submit" className="btn">Place Order</button>
      </form>
    </div>
  );
}
