const initialState = {
    userBookings: [],
    showBookingsError: false,
  };
  
  const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_BOOKINGS_START':
        return {
          ...state,
          showBookingsError: false,
        };
      case 'FETCH_USER_BOOKINGS_SUCCESS':
        return {
          ...state,
          userBookings: action.payload,
        };
      case 'FETCH_USER_BOOKINGS_FAILURE':
        return {
          ...state,
          showBookingsError: true,
        };
      default:
        return state;
    }
  };
  
  export default bookingReducer;
  