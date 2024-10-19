import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from "../common/api";

const BASE_URL = "https://cuvette-backend-pwt6.onrender.com";

export const signUp = createAsyncThunk(
  "testSlice/signUp",
  async (params, thunkAPI) => {
    try {
      const response = await callApi(`${BASE_URL}/api/signup`, "POST", {
        ...params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

export const otpVerification = createAsyncThunk(
  "testSlice/otpVerification",
  async (params, thunkAPI) => {
    try {
      const response = await callApi(`${BASE_URL}/api/verifyemail`, "POST", {
        ...params,
      });

      if(response?.token) {
        localStorage.setItem("token", response?.token);
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

const testSlice = createSlice({
  name: "testSlice",
  initialState: {
    value: 0,
    signupData: {
      isLoading: false,
      status: false,
      data: {}
    },
    otpVerification: {
      isLoading: false,
      emailStatus: false,
      phoneStatus: false,
    }
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.signupData.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signupData.isLoading = false;
        state.signupData.status = true;
        state.signupData.data = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signupData.isLoading = false;
      });
    ///////////////////////////////////////////////////////////
    builder
      .addCase(otpVerification.pending, (state) => {
        state.otpVerification.isLoading = true;
      })
      .addCase(otpVerification.fulfilled, (state, action) => {
        state.otpVerification.isLoading = false;
        state.otpVerification.emailStatus = action?.payload?.token ? true : false;
        state.otpVerification.phoneStatus = action?.payload?.token ? true : false;
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.otpVerification.isLoading = false;
      });
  },
});

export const { increment, decrement, incrementByAmount } = testSlice.actions;
export default testSlice.reducer;
