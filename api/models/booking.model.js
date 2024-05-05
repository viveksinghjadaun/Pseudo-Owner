import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    { 
        listingName: {
            type: String, 
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User Id field is required']
        },
        listingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing',
            required: [true, 'Listing Id field is required']
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed']
        },
        perDayPrice: {
            type: Number
        },
        bookingPrice: {
            type: Number
        },
        razorpayPaymentId: { type: String },
        razorpayOrderId: { type: String },
        dateOfBooking: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Booking = mongoose.model('Bookings', bookingSchema);

export default Booking;
