//import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearAuthError } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Customer' });

  useEffect(() => {
    dispatch(clearAuthError());
    if (user) navigate(user.role === 'Admin' ? '/admin' : '/menu');
  }, [user, isLogin, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    } else {
      dispatch(registerUser(formData));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Create Account'}</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {!isLogin && (
          <input type="text" placeholder="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ padding: '0.5rem' }} />
        )}
        <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ padding: '0.5rem' }} />
        <input type="password" placeholder="Password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ padding: '0.5rem' }} />
        {!isLogin && (
          <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ padding: '0.5rem' }}>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
        )}
        <button type="submit" disabled={loading} style={{ background: '#0070f3', color: '#fff', padding: '0.75rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem', cursor: 'pointer', color: '#0070f3' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </p>
    </div>
  );
}
