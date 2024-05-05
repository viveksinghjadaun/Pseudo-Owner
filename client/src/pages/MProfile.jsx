import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showBookingsError, setShowBookingsError] = useState(false);
  const [userBookings, setUserBookings] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleShowBookings = async () => {
    try {
      const userId = currentUser._id;
      setShowBookingsError(false);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/booking/${userId}/bookings`);
      const data = await res.json();
      console.log("Bookings data:", data);

      if (data.message === false) {
        setShowBookingsError(true);
        return;
      }
      setUserBookings(data.bookings);

      // setUserBookings(data.bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      setShowBookingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("userBookings:", userBookings);
  }, [userBookings]);

  return (
    <div className="p-3 max-w-2xl mx-auto border rounded-lg mt-11  shadow-md mb-11">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <Link to={"/profile"}>
        <div className="black-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 gap-4 mt-10 border rounded-lg text-center shadow-md">
          Update Credentials
        </div>
      </Link>

      <Link to={"/create-listing"}>
        <div className="black-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border rounded-lg mt-2 text-center shadow-md">
          List a Car Or Driver
        </div>
      </Link>

      <button
        onClick={handleShowListings}
        className="text-black rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 border rounded-lg mt-2 text-center w-full shadow-md"
      >
        Show Listings
      </button>
      <p className="text-red-700 ">
        {showListingsError ? "Error showing listings" : ""}
      </p>
      {Array.isArray(userListings) && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleShowBookings}
        className="text-black rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 border rounded-lg mt-2 text-center w-full shadow-md"
      >
        Show Bookings
      </button>
      <p className="text-red-700 mt-5">
        {showBookingsError ? "Error showing bookings" : ""}
      </p>

      {Array.isArray(userBookings) && userBookings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">Your Bookings</h1>
          {userBookings
            .sort((a, b) => b._id.localeCompare(a._id))
            .map((booking) => (
              <div
                key={booking._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4 bg-gray-100 hover:bg-gray-200"
              >
                <Link to={`/listing/${booking.listing._id}`}>
                  <p className="text-blue-600 hover:underline">{booking.listingName}</p>
                </Link>
                <p>From: {booking.startDate.substring(0, 10)}</p>
                <p>To: {booking.endDate.substring(0, 10)}</p>
                <p>Booking Price: {booking.bookingPrice}</p>
                <div className="flex flex-col item-center">
                  {/* Add any additional elements or actions here */}
                </div>
              </div>
            ))}
        </div>
      )}
      <div
        onClick={handleDeleteUser}
        className="text-black rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer border rounded-lg mt-2 text-center shadow-md"
      >
        Delete account
      </div>

      <div
        onClick={handleSignOut}
        className="text-black rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer border rounded-lg mt-2 text-center shadow-md mb-8"
      >
        Sign out
      </div>
    </div>
  );
}
