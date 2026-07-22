import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, submitOrder, clearCart } from '../store/slices/orderSlice';
import axios from 'axios';
import { Search, Filter, Trash2, ShoppingCart } from 'lucide-react';

export default function MenuList() {
  const dispatch = useDispatch();
  const { cartItems, success, loading } = useSelector((state) => state.order);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await axios.get('http://localhost:5000/api/menu');
      setItems(res.data);
    };
    fetchMenu();
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    dispatch(submitOrder({ items: cartItems }));
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) && (category === 'All' || item.category === category)
  );

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ flex: '2' }}>
        <h2>Our Dynamic Menu</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <input type="text" placeholder="Search menu..." onChange={(e) => setSearch(e.target.value)} style={{ padding: '0.5rem', flex: '1' }} />
          <select onChange={(e) => setCategory(e.target.value)} style={{ padding: '0.5rem' }}>
            <option value="All">All Categories</option>
            <option value="Mains">Mains</option>
            <option value="Appetizers">Appetizers</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {filteredItems.map(item => (
            <div key={item._id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '6px' }}>
              <h4>{item.name}</h4>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>{item.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span>${item.price}</span>
                <button onClick={() => dispatch(addToCart({ menuItem: item._id, name: item.name, price: item.price, quantity: 1 }))} style={{ background: '#0070f3', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>+ Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: '1', border: '1px solid #ccc', padding: '1.5rem', borderRadius: '8px', maxHeight: '500px', overflowY: 'auto' }}>
        <h3><ShoppingCart size={20} /> Your Active Cart</h3>
        {success && <p style={{ color: 'green' }}>Order placed successfully!</p>}
        {cartItems.map(item => (
          <div key={item.menuItem} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <div>{item.name} (x{item.quantity})</div>
            <button onClick={() => dispatch(removeFromCart(item.menuItem))} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}><Trash2 size={16} /></button>
          </div>
        ))}
        {cartItems.length > 0 && (
          <button onClick={handleCheckout} disabled={loading} style={{ width: '100%', marginTop: '1.5rem', background: '#22c55e', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Submitting...' : 'Place Food Order'}
          </button>
        )}
      </div>
    </div>
  );
}
