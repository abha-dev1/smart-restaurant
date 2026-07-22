import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitOrder = createAsyncThunk('order/submitOrder', async (orderData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post('http://localhost:5000/api/orders', orderData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: { cartItems: [], loading: false, error: null, success: false },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cartItems.find(item => item.menuItem === action.payload.menuItem);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.menuItem !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => { state.loading = true; state.success = false; })
      .addCase(submitOrder.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
        state.success = true;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { addToCart, removeFromCart, clearCart } = orderSlice.actions;
export default orderSlice.reducer;
