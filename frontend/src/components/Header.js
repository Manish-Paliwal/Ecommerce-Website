import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';

export default function Header() {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();
  const cartCount = state.cart.cartItems.reduce((a, c) => a + c.qty, 0);

  function logout() {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">MyStore</Link>
        <nav>
          <Link to="/cart">Cart ({cartCount})</Link>
          {state.user ? (
            <>
              <span style={{ marginLeft: 8 }}>{state.user.user.name}</span>
              {state.user.user.isAdmin && <Link to="/admin" style={{ marginLeft: 8 }}>Admin</Link>}
              <button onClick={logout} className="link-button">Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
