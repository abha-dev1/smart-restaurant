import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setCredentials } from '../store';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      dispatch(setCredentials(res.data));
      navigate(res.data.user.role === 'Admin' ? '/admin' : '/menu');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="text-center fw-bold mb-4 text-dark">Welcome Back</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">Email Address</label>
                <input type="email" {...register('email', { required: 'Email required' })} className="form-control" />
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary">Password</label>
                <input type="password" {...register('password', { required: 'Password required' })} className="form-control" />
                {errors.password && <small className="text-danger">{errors.password.message}</small>}
              </div>
              <button type="submit" className="btn btn-warning w-full py-2 fw-bold text-dark">Sign In</button>
            </form>
            <p className="text-center mt-3 mb-0 text-muted small">
              New here? <Link to="/register" className="text-decoration-none text-warning fw-bold">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
