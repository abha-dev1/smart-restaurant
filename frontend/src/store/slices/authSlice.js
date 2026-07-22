import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';
const storedUser = JSON.parse(localStorage.getItem('restaurant_user')) || null;

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    localStorage.setItem('restaurant_user', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/login`, userData);
    localStorage.setItem('restaurant_user', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: storedUser, loading: false, error: null },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('restaurant_user');
      state.user = null;
      state.error = null;
    },
    clearAuthError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { logoutUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
