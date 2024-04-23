import express from 'express';
import { confirmPayment } from '../controllers/payment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


// router.route('/confirm-payment').post(confirmPayment);
router.route('/confirm-payment').post(verifyToken, confirmPayment);



export default router;