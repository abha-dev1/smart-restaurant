import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

export default function Navbar() {
  const { user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-warning d-flex align-items-center gap-2">
          <i className="bi bi-egg-fried fs-4"></i> SmartBite
        </Link>
        <div className="d-flex align-items-center gap-4 ms-auto">
          <Link to="/menu" className="nav-link text-white">Menu</Link>
          
          {user?.role === 'Customer' && (
            <>
              <Link to="/reserve" className="nav-link text-white d-flex align-items-center gap-1">
                <i className="bi bi-calendar-event"></i> Book Table
              </Link>
              <Link to="/cart" className="nav-link text-white position-relative d-flex align-items-center gap-1">
                <i className="bi bi-cart3"></i> Cart
                {items.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                    {items.length}
                  </span>
                )}
              </Link>
            </>
          )}
          
          {user?.role === 'Admin' && (
            <Link to="/admin" className="nav-link text-warning fw-semibold d-flex align-items-center gap-1">
              <i className="bi bi-shield-check"></i> Dashboard
            </Link>
          )}
          
          {user ? (
            <button onClick={() => { dispatch(logout()); navigate('/login'); }} className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1">
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-warning btn-sm fw-bold">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
