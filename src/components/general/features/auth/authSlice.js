import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authActions';
import { TOKEN_KEY } from '../../../../services/apiService';

const persistedState = localStorage.getItem(TOKEN_KEY) 
                   ? JSON.parse(localStorage.getItem(TOKEN_KEY))
                   : {};

const initialState = {
  loading: false,
  userInfo: persistedState.userInfo || null,
  userToken: persistedState.userToken || null,
  role: persistedState.role || 'user',
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      state.role = 'user';
      state.success = false;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('userRole');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload ) {
          state.userInfo = payload;
          state.userToken = payload.token;
          state.role = payload.role;
          state.success = true;
          localStorage.setItem(TOKEN_KEY,JSON.stringify({
            userInfo: payload,
            userToken: payload.token,
            role: payload.role
          }));
          localStorage.setItem('userRole', payload.role);
        } else {
          state.error = 'Unexpected payload structure';
        }
        
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload && payload.token) {
          state.userInfo = payload;
          state.userToken = payload.token;
          state.role = payload.role;
          localStorage.setItem(TOKEN_KEY, JSON.stringify({
            userInfo: payload,
            userToken: payload.token,
            role: payload.role
          }));
        } else {
          state.error = 'Invalid email or password';
        }
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
