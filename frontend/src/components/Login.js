import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import { Store } from '../context/Store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      // data: { token, user }
      dispatch({ type: 'SET_USER', payload: { token: data.token, user: data.user } });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
      </form>
      <div>New? <Link to="/register">Create account</Link></div>
    </div>
  );
}
