import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../../../../services/apiService'

const backendURL = API_URL

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ name, email, password ,confirmPassword}, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.post(
          `${backendURL}/users`,
          { name, email, password ,confirmPassword},
          config
        );
        console.log(response.data);

        return response.data;
      } catch (error) {
        console.error(error.response || error);

        // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue('An error occurred during registration. Please try again.');
        }
      }
    }
  );

  export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.post(
          `${backendURL}/users/login`,
          { email, password },
          config
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error.response || error);
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue('An error occurred during login. Please try again.');
        }
      }
    }
  );
  