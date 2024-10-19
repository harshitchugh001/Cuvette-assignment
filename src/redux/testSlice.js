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

      if (response?.token) {
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

export const createInterview = createAsyncThunk(
  "testSlice/createInterview",
  async (params, thunkAPI) => {
    console.log(thunkAPI?.getState()?.testSlice, "1111111111111111111");

    try {
      const response = await callApi(
        `${BASE_URL}/api/jobadded`,
        "POST",
        {
          ...params,
        },
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

export const verifyToken = createAsyncThunk(
  "testSlice/verifyToken",
  async (params, thunkAPI) => {
    try {
      const response = await callApi(
        `${BASE_URL}/api/tokenverify`,
        "POST",
        {},
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      // if (!response?.success) {
      //   localStorage.removeItem("token");
      // }
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
      data: {},
    },
    otpVerification: {
      isLoading: false,
      emailStatus: false,
      phoneStatus: false,
      token: null,
    },
    createInterview: {
      isLoading: false,
      status: false,
      data: {},
    },
    verifyToken: {
      isLoading: false,
    },
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
        state.otpVerification.emailStatus = action?.payload?.emailverified;
        state.otpVerification.phoneStatus = action?.payload?.phoneverified;
        state.otpVerification.token = action?.payload?.token;
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.otpVerification.isLoading = false;
      });
    ///////////////////////////////////////////////////////////
    builder
      .addCase(createInterview.pending, (state) => {
        state.createInterview.isLoading = true;
      })
      .addCase(createInterview.fulfilled, (state, action) => {
        state.createInterview.isLoading = false;
        state.createInterview.data = action.payload;
        state.createInterview.status = action.payload?.status;
      })
      .addCase(createInterview.rejected, (state, action) => {
        state.createInterview.isLoading = false;
      });
    ///////////////////////////////////////////////////////////
    builder
      .addCase(verifyToken.pending, (state) => {
        state.verifyToken.isLoading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.verifyToken.isLoading = false;
        state.otpVerification.token = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.verifyToken.isLoading = false;
      });
  },
});

export const { increment, decrement, incrementByAmount } = testSlice.actions;
export default testSlice.reducer;
