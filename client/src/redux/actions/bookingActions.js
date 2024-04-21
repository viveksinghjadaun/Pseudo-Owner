const fetchUserBookingsStart = () => ({
    type: 'FETCH_USER_BOOKINGS_START',
  });
  
  const fetchUserBookingsSuccess = (bookings) => ({
    type: 'FETCH_USER_BOOKINGS_SUCCESS',
    payload: bookings,
  });
  
  const fetchUserBookingsFailure = () => ({
    type: 'FETCH_USER_BOOKINGS_FAILURE',
  });
  
  export const fetchUserBookings = (userId) => async (dispatch) => {
    dispatch(fetchUserBookingsStart());
    try {
      const res = await fetch(`/api/booking/${userId}/bookings`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(fetchUserBookingsFailure());
        return;
      }
      dispatch(fetchUserBookingsSuccess(data.bookings));
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      dispatch(fetchUserBookingsFailure());
    }
  };
  