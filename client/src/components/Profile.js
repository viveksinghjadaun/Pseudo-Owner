import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../redux/actions/bookingActions';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const { userBookings, showBookingsError, loading } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserBookings(currentUser._id));
    }
  }, [currentUser, dispatch]);

  const handleBookingDelete = async (bookingId) => {
    // Delete booking logic
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      {/* Show Bookings Button */}
      <button onClick={handleShowBookings} className='text-black rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
        Show Bookings
      </button>
      
      {/* Error Message for Show Bookings */}
      <p className='text-red-700 mt-5'>
        {showBookingsError && 'Error showing bookings'}
      </p>

      {/* Render User Bookings */}
      {userBookings && userBookings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Bookings
          </h1>
          {userBookings.map((booking) => (
            <div
              key={booking._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <p>Start Date: {booking.startDate}</p>
              <p>End Date: {booking.endDate}</p>
              <p>Booking Price: {booking.bookingPrice}</p>
              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleBookingDelete(booking._id)}
                  className='text-red-700 uppercase'
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
