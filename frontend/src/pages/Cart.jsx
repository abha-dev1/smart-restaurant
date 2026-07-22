import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store';
import axios from 'axios';

export default function Cart() {
  const { items, total } = useSelector(state => state.cart);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (!token) return alert('Please log in to complete checkout.');
    try {
      await axios.post('http://localhost:5000/api/orders', {
        items: items.map(i => ({ menuItemId: i._id, quantity: i.quantity })),
        totalAmount: total
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Order placed successfully!');
      dispatch(clearCart());
    } catch (err) {
      alert('Checkout error processing order.',err);
    }
  };

  if (items.length === 0) return <div className="text-center mt-5 text-muted fw-semibold">Your cart is currently empty.</div>;

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-8">
          <h4 className="fw-bold border-bottom pb-2 mb-3">Your Selected Items</h4>
          {items.map(item => (
            <div key={item._id} className="card p-3 mb-3 border-0 shadow-sm d-flex flex-row justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
                <p className="text-muted small mb-0">${item.price} x {item.quantity}</p>
              </div>
              <button onClick={() => dispatch(removeFromCart(item._id))} className="btn btn-outline-danger border-0 btn-sm">
                <i className="bi bi-trash3 fs-5"></i>
              </button>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card p-4 border-0 shadow-sm bg-light">
            <h5 className="fw-bold mb-4">Summary</h5>
            <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-3 mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="btn btn-warning w-100 py-2 fw-bold text-dark">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
