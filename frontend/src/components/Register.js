import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Store } from '../context/Store';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      dispatch({ type: 'SET_USER', payload: { token: data.token, user: data.user } });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <div className="auth-box">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" type="submit">Create account</button>
      </form>
    </div>
  );
}
