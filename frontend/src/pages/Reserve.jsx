import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Reserve() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { token } = useSelector(state => state.auth);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/reservations', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Table reserved successfully!');
      reset();
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing reservation');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 border-0 shadow-sm">
            <h2 className="text-center fw-bold mb-4 text-dark">Book A Table</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Date</label>
                <input type="date" {...register('date', { required: 'Date is required' })} className="form-control" />
                {errors.date && <small className="text-danger">{errors.date.message}</small>}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Time Slot</label>
                <select { ...register('timeSlot', { required: 'Time slot required' })} className="form-select bg-white">
                  <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                  <option value="08:00 PM - 10:00 PM">08:00 PM - 10:00 PM</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Total Guests</label>
                <input type="number" min="1" max="12" {...register('guestsCount', { required: 'Required', min: 1 })} className="form-control" />
              </div>
              <button type="submit" className="btn btn-dark w-100 py-2 fw-bold">Confirm Booking</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
