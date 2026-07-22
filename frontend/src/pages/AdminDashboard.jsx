import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AdminDashboard() {
  const { token } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    axios.get('http://localhost:5000/api/orders/admin', { headers }).then(res => setOrders(res.data)).catch(err => console.log(err));
    axios.get('http://localhost:5000/api/reservations/admin', { headers }).then(res => setReservations(res.data)).catch(err => console.log(err));
  }, [token]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Error updating order state');
    }
  };

  return (
    <div className="container my-5">
      <div className="mb-5">
        <h3 className="fw-bold text-dark mb-4">Active Orders Management</h3>
        <div className="card border-0 shadow-sm overflow-hidden">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Total Bill</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action Control</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td className="p-3 font-monospace small">{order._id}</td>
                    <td className="p-3 fw-semibold">${order.totalAmount.toFixed(2)}</td>
                    <td className="p-3"><span className="badge bg-warning text-dark px-2.5 py-1.5">{order.status}</span></td>
                    <td className="p-3">
                      <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)} className="form-select form-select-sm w-auto">
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
        </div>
      </div>

      <div>
        <h3 className="fw-bold text-dark mb-4">Upcoming Table Reservations</h3>
        <div className="row g-3">
          {reservations.map(res => (
            <div key={res._id} className="col-md-4">
              <div className="card p-3 border-0 shadow-sm border-start border-4 border-warning">
                <small className="text-muted font-monospace d-block mb-1">ID: {res._id}</small>
                <h6 className="fw-bold mb-1">Date: {new Date(res.date).toLocaleDateString()}</h6>
                <p className="text-secondary small mb-2">Window: {res.timeSlot}</p>
                <span className="fw-bold text-dark small">Covers: {res.guestsCount} People</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
