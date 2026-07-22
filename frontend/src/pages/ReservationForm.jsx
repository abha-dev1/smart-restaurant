import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ReservationForm() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ tableNumber: '', date: '', timeSlot: '18:00-20:00', guests: 2 });
  const [msg, setMsg] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      await axios.post('http://localhost:5000/api/reservations', formData, config);
      setMsg('Table reservation booked successfully!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Booking collision occurred.');
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '3rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Reserve a Fine Dining Table</h3>
      {msg && <p style={{ fontWeight: 'bold' }}>{msg}</p>}
      <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="number" placeholder="Table Number" required onChange={e => setFormData({ ...formData, tableNumber: parseInt(e.target.value) })} style={{ padding: '0.5rem' }} />
        <input type="date" required onChange={e => setFormData({ ...formData, date: e.target.value })} style={{ padding: '0.5rem' }} />
        <select onChange={e => setFormData({ ...formData, timeSlot: e.target.value })} style={{ padding: '0.5rem' }}>
          <option value="12:00-14:00">Lunch (12:00 PM - 2:00 PM)</option>
          <option value="18:00-20:00">Dinner (6:00 PM - 8:00 PM)</option>
          <option value="20:00-22:00">Late Night (8:00 PM - 10:00 PM)</option>
        </select>
        <input type="number" min="1" placeholder="Guests Count" required onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })} style={{ padding: '0.5rem' }} />
        <button type="submit" style={{ background: '#0070f3', color: '#fff', padding: '0.75rem', border: 'none', cursor: 'pointer' }}>Confirm Booking</button>
      </form>
    </div>
  );
}
