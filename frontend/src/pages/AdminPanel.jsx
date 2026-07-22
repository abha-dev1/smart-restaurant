import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AdminPanel() {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAdminOrders = async () => {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const res = await axios.get('http://localhost:5000/api/orders', config);
      setOrders(res.data);
    };
    if (user) fetchAdminOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    const config = { headers: { Authorization: `Bearer ${user?.token}` } };
    await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, config);
    setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Operational Admin Command Centre</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
        <thead>
          <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '0.75rem' }}>Order ID</th>
            <th style={{ padding: '0.75rem' }}>Customer</th>
            <th style={{ padding: '0.75rem' }}>Total Bill</th>
            <th style={{ padding: '0.75rem' }}>Status Track</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}>{o._id}</td>
              <td style={{ padding: '0.75rem' }}>{o.user?.name || 'Guest'}</td>
              <td style={{ padding: '0.75rem' }}>${o.totalPrice?.toFixed(2)}</td>
              <td style={{ padding: '0.75rem' }}>
                <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)} style={{ padding: '0.25rem' }}>
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Ready">Ready</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
