import mongoose from 'mongoose';


const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookings',
        required: true
    },
    paymentMethod: { type: String, required: false },
    transationId: { type: String, required: false },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled', 'failed'],
        required: true
    }
}, { timestamps: true });

const Listing = mongoose.model('Payments', paymentSchema);

export default Listing;