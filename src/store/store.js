import { configureStore } from '@reduxjs/toolkit';
import testSlice from '../redux/testSlice';

const store = configureStore({
  reducer: {
    testSlice
  },
});

export default store;
