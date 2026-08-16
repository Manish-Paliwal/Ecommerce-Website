import React, { useContext, useEffect, useState } from 'react';
import API from '../api';
import { Store } from '../context/Store';

export default function Admin() {
  const { state } = useContext(Store);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function deleteProduct(id) {
    if (!state.user) return alert('Login as admin');
    if (!window.confirm('Delete product?')) return;
    try {
      await API.delete('/products/' + id, { headers: { Authorization: 'Bearer ' + state.user.token }});
      setProducts(p => p.filter(x => x._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  }

  async function createSample() {
    if (!state.user) return alert('Login as admin');
    try {
      const sample = {
        name: 'New Product ' + Date.now(),
        description: 'Sample product',
        price: 9.99,
        countInStock: 10,
        image: 'https://via.placeholder.com/300',
        category: 'Misc'
      };
      const { data } = await API.post('/products', sample, { headers: { Authorization: 'Bearer ' + state.user.token }});
      setProducts(p => [data, ...p]);
    } catch (err) {
      console.error(err);
      alert('Failed to create');
    }
  }

  return (
    <div>
      <h2>Admin — Products</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={createSample} className="btn">Create sample product</button>
      </div>
      {loading ? <div>Loading...</div> : (
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.countInStock}</td>
                <td>
                  <button onClick={() => deleteProduct(p._id)} className="link-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
