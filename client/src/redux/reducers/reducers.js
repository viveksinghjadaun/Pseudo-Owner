import { combineReducers } from 'redux';
import userReducer from './userSlice';
import bookingReducer from './bookingSlice';

const rootReducer = combineReducers({
  user: userReducer,
  bookings: bookingReducer,
  // Add other reducers here if needed
});

export default rootReducer;
