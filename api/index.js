import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { default as cors, default as crossOrigin } from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js';
import bookingRouter from './routes/booking.route.js';
import listingRouter from './routes/listing.route.js';
import paymentRouter from './routes/payment.route.js';
import userRouter from './routes/user.route.js';
// import { default as paymentRouter, default as userRouter } from './routes/payment.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch((err) => {
        console.log(err);
    })

const app = express();
const allowedOrigins = [
    'http://localhost:5173',
];
app.use(crossOrigin({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS origin'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
}
);

app.use('/api/user', userRouter);

app.use('/api/auth', authRouter);

app.use('/api/listing', listingRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/payment', paymentRouter);




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});