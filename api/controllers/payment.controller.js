import crypto from 'crypto';
import BookingModel from '../models/booking.model.js';
import PaymentModel from '../models/payment.model.js';

export const confirmPayment = async (req, res, next) => {
    try {
        console.log(req.body);
        const bookingId = req.query.bookingId;
        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                message: "Booking does not exist"
            });
        }

        const { razorpay_payment_id: razorpayPaymentId, razorpay_order_id: razorpayOrderId, razorpay_signature: razorpaySignature } = req.body;

        const body = razorpayOrderId + "|" + razorpayPaymentId;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex');
        const isAuthentic = expectedSignature === razorpaySignature;
        console.log(razorpayPaymentId, razorpayOrderId, razorpaySignature, expectedSignature);

        const paymentData = await PaymentModel.findOne({
            bookingId
        });

        if (!isAuthentic) {
            paymentData.status = 'failed';
            paymentData.save();

            booking.status = 'rejected';
            booking.paymentStatus = 'failed';
            booking.save();

            return res.status(400).json({
                message: 'Request signature did not match. Please try again with a valid signature.'
            });
        } else {
            paymentData.status = 'completed';
            paymentData.save();

            booking.status = 'approved';
            booking.razorpayPaymentId = razorpayPaymentId;
            booking.razorpayOrderId = razorpayOrderId;
            booking.paymentStatus = 'paid';
            booking.save();

           return res.redirect('https://pseudo-owner.vercel.app/');
        }

    } catch (error) {
        next(error)
    }
};

