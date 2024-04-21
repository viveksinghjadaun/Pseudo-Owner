import { differenceInCalendarDays, format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
// import DatePicker from "react-datepicker"; // Import react-datepicker
// import dateFnsTz from 'date-fns-tz';
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaShare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Calendar from "../components/Calendar";
import { createBooking } from "../http";
// const { utcToZonedTime } = dateFnsTz;
// const { utcToZonedTime } = require("date-fns-tz");
import { utcToZonedTime } from "date-fns-tz";

const intialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export default function Listing() {
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [totalBookingPrice, setTotalBookingPrice] = useState(
    listing?.discountPrice
  );
  const [dateRange, setDateRange] = useState(intialDateRange);

  function parseDate(dateString) {
    const timeZone = "Asia/Kolkata";
    const dateObject = new Date(dateString);
    const zonedDate = utcToZonedTime(dateObject, timeZone);
    const formattedDate = format(zonedDate, "dd-MM-yyyy", { timeZone });
    return formattedDate;
  }

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const handleBooking = useCallback(async () => {
    if (!currentUser) {
      alert("You should login to book");
    }

    try {
      const { data: bookingData } = await createBooking({
        userId: currentUser._id,
        listingId: params.listingId,
        startDate: parseDate(dateRange.startDate),
        endDate: parseDate(dateRange.endDate),
        bookingPrice: totalBookingPrice,
      });

      const booking = bookingData.booking;
      const razorpayOrder = bookingData.razorpayOrder;

      const API_URL = "http://localhost:3000";
      const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_API_KEY;
      console.log(razorpayOrder);
      const razorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: booking.bookingPrice * 100,
        currency: "INR",
        name: "Pseudo Owner",
        description: `${listing.name}`,
        image: `${listing.imageUrls[0]}`,
        order_id: razorpayOrder.id,
        callback_url: `${API_URL}/api/payment/confirm-payment?bookingId=${booking._id}`,
        headers: {
          orderId: `${razorpayOrder.id}`,
        },
        prefill: {
          name: currentUser.username,
          email: currentUser.email,
        },
        notes: {
          address: "Razorpay Corporate Office",
          orderId: razorpayOrder.id,
        },
        theme: {
          color: "#e2e8f0",
        },
        redirect: false,
      };
      console.log(razorpayOptions);
      const razor = new window.Razorpay(razorpayOptions);
      console.log("Kk");

      razor.on("payment.success", function (response) {
        const responseData = response?.detail || {};
        if (responseData.status === "completed") {
          setDateRange(intialDateRange);
          console.log("Car is booked");
        }

        navigate("/user/bookings");
      });

      razor.on("payment.error", function (response) {
        const responseData = response?.detail || {};
        if (responseData.status === "failed") {
          console.log("Payment failed. Please try again.");
        }
      });

      razor.open();
      console.log(razorpayOptions);

      console.log(bookingData);
    } catch (err) {
      console.log(err);
    }
  }, [
    currentUser,
    dateRange.startDate,
    dateRange.endDate,
    params.listingId,
    totalBookingPrice,
    listing?.imageUrls,
    listing?.name,
    navigate,
  ]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
        console.log(data);
        console.log(listing);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust this value to control how many images are shown at once
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      let dayCount;

      if (dateRange.startDate === dateRange.endDate) {
        dayCount = 1;
      } else {
        dayCount = differenceInCalendarDays(
          dateRange.endDate,
          dateRange.startDate
        );
        dayCount += 1;
      }

      if (dayCount && listing?.discountPrice) {
        setTotalBookingPrice(dayCount * listing?.discountPrice);
      } else {
        setTotalBookingPrice(listing?.discountPrice);
      }
    }
  }, [dateRange, listing?.discountPrice]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          {listing.imageUrls.length === 1 ? (
            <div>
              <img
                src={listing.imageUrls[0]}
                alt={`listing-image`}
                className="h-[550px] w-full object-cover"
              />
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {listing.imageUrls.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt={`slide-${index}`}
                    className="h-[550px] w-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          )}
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-2">
            <p className="text-2xl font-semibold">
              {listing.name} - Rs{" "}
              {listing.discountPrice.toLocaleString("en-US")}
              /Day
            </p>

            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "intercity"
                  ? "Allowed intercity"
                  : "Not Allowed intercity"}
              </p>
              {listing.offer && (
                <p className=" bg-green-900 w-full max-w-[200px]  text-white text-center p-1 rounded-md line-through">
                  Rs{listing.regularPrice}/Day
                </p>
              )}
              {listing.available && (
                <p className=" bg-green-600 w-full max-w-[200px]  text-white text-center p-1 rounded-md ">
                  Driver Available
                </p>
              )}

              <button
                onClick={handleBooking}
                className=" bg-blue-500 w-full max-w-[200px] text-white rounded-md"
                style={{ fontSize: "0.8rem" }}
              >
                Book Now
              </button>
            </div>

            <div className="flex flex-col bg-white rounded-lg lg:flex-row">
              <div className="p-4 ml-6 mt-6 sm: ml-4">
                <p className="flex items-center gap-2 text-slate-800 text-sm">
                  <FaMapMarkerAlt className="text-green-700" />
                  <span className="font-semibold text-black">Pick Up :</span>
                  {listing.address}, {listing.city}
                </p>
                <p className="flex items-center gap-2 text-slate-800 text-sm">
                  <FaPhoneAlt className="text-green-700" />
                  <span className="font-semibold text-black">
                    Phone Number :
                  </span>
                  {listing.phoneNumber}
                </p>
                <p className="text-slate-800 text-sm">
                  <span className="font-semibold text-black">
                    Description :{" "}
                  </span>
                  {listing.description}
                </p>
                <p className="text-slate-800 text-sm">
                  <span className="font-semibold text-black">
                    Car Number :{" "}
                  </span>
                  {listing.CarNumber}
                </p>
                {listing.available && (
                  <div>
                    <p className="text-slate-800">
                      <span className="font-semibold text-black">
                        Driver Name :{" "}
                      </span>
                      {listing.DriverName}
                    </p>
                    <p className="text-slate-800">
                      <span className="font-semibold text-black">
                        Experience:{" "}
                      </span>
                      {listing.experience} Year
                    </p>
                  </div>
                )}
              </div>
              <div className="p-4 lg:ml-auto ">
                <Calendar
                  value={dateRange}
                  onChange={(value) => setDateRange(value.selection)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
