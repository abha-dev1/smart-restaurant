import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Feedback() {
  const { user } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: 5, comment: '' });

  const fetchReviews = async () => {
    const res = await axios.get('http://localhost:5000/api/feedback');
    setReviews(res.data);
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleFeedback = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${user?.token}` } };
    await axios.post('http://localhost:5000/api/feedback', form, config);
    setForm({ rating: 5, comment: '' });
    fetchReviews();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', fontFamily: 'sans-serif' }}>
      <h3>Customer Reviews & Testimonials</h3>
      {user && (
        <form onSubmit={handleFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          <select value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })} style={{ padding: '0.5rem' }}>
            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
          </select>
          <textarea placeholder="Write your review here..." value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} style={{ padding: '0.5rem', height: '80px' }} required />
          <button type="submit" style={{ background: '#0070f3', color: '#fff', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>Submit Review</button>
        </form>
      )}
      <div>
        {reviews.map(r => (
          <div key={r._id} style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
            <strong>{r.user?.name || 'Anonymous'}</strong> — {r.rating} ⭐
            <p style={{ margin: '0.25rem 0 0 0', color: '#555' }}>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
