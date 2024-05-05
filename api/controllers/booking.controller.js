

import moment from 'moment';
import Razorpay from 'razorpay';
import uuid from 'uuid';
import BookingModel from '../models/booking.model.js';
import ListingModel from '../models/listing.model.js';
import PaymentModel from '../models/payment.model.js';
import UserModel from '../models/user.model.js';




export const createBooking = async (req, res, next) => {
  try {
    const { userId, listingId, startDate, endDate, bookingPrice } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "Error fetching user details"
      });
    }

    if (!listingId) {
      return res.status(400).json({
        message: "Error fetching listing details"
      });
    }

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "Start and end dates are required to book"
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User does not exist"
      });
    }
    const listing = await ListingModel.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        message: "Listing does not exist"
      });
    }

    const formattedStartDate = moment(startDate, 'DD-MM_YYYY').toDate();
    const formattedEndDate = moment(endDate, 'DD-MM_YYYY').toDate();

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    let numberOfDays = Math.ceil((formattedEndDate - formattedStartDate) / (millisecondsPerDay)) + 1;

    const totalPrice = numberOfDays * listing.discountPrice;
    console.log(numberOfDays, totalPrice);

    if (bookingPrice != totalPrice) {
      return res.status(500).json({
        message: "Something went wrong!!"
      });
    }

    const bookingData = {
      userId,
      listingId,
      listingName: listing.name,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      bookingPrice
    }

    const booking = await BookingModel.create(bookingData);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });
    const razorpayOrder = await razorpay.orders.create({
      amount: Number(bookingPrice * 100),

    });
    console.log(razorpayOrder);
    await PaymentModel.create({
      bookingId: booking._id,
      amount: bookingPrice,
      transationId: uuid.v4(),
      status: 'pending'
    });

    return res.status(201).json({
      message: "New Booking created successfully",
      booking,
      razorpayOrder
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const bookings = await BookingModel.find({ userId })
      .populate('listingId')
      .exec();

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        message: "No bookings found for this user",
      });
    }

    const bookingsWithListings = bookings.map((booking) => ({
      _id: booking._id,
      listingName: booking.listingName,
      startDate: booking.startDate,
      endDate: booking.endDate,
      bookingPrice: booking.bookingPrice,
      listing: booking.listingId,
    }));

    return res.status(200).json({
      message: "User bookings retrieved successfully",
      bookings: bookingsWithListings,
    });
  } catch (error) {
    next(error);
  }
};

