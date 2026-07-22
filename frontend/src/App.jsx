// import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './store/slices/authSlice';

import AuthForm from './pages/AuthForm.jsx';
import MenuList from './pages/MenuList';
import ReservationForm from './pages/ReservationForm';
import AdminPanel from './pages/AdminPanel';
import Feedback from './pages/Feedback';

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/menu" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', background: '#111', color: '#fff', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>SmartRestaurant</div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/menu" style={{ color: '#fff', textDecoration: 'none' }}>Menu</Link>
          <Link to="/feedback" style={{ color: '#fff', textDecoration: 'none' }}>Reviews</Link>
          {user && <Link to="/reserve" style={{ color: '#fff', textDecoration: 'none' }}>Book Table</Link>}
          {user?.role === 'Admin' && <Link to="/admin" style={{ color: '#fff', textDecoration: 'none', background: 'red', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Admin Panel</Link>}
          {user ? (
            <button onClick={() => dispatch(logoutUser())} style={{ background: '#555', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          ) : (
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', background: '#0070f3', padding: '0.4rem 0.8rem', borderRadius: '4px' }}>Login</Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/menu" element={<MenuList />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/reserve" element={<ProtectedRoute><ReservationForm /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminPanel /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/menu" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
