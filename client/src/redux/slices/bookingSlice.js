import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userBookings: [],
  showBookingsError: false,
  loading: false,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    fetchUserBookings(state) {
      state.loading = true;
      state.showBookingsError = false;
    },
    fetchUserBookingsSuccess(state, action) {
      state.loading = false;
      state.userBookings = action.payload;
      state.showBookingsError = false;
    },
    fetchUserBookingsFailure(state) {
      state.loading = false;
      state.showBookingsError = true;
    },
  },
});

export const { fetchUserBookings, fetchUserBookingsSuccess, fetchUserBookingsFailure } = bookingSlice.actions;

export default bookingSlice.reducer;
