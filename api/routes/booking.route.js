import express from 'express';
import { createBooking , getUserBookings} from '../controllers/booking.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.route('/book').post(verifyToken, createBooking);
router.route('/:userId/bookings').get(verifyToken, getUserBookings);



export default router;