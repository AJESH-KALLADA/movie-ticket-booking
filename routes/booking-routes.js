import express from 'express';
import { getBookingById, newBooking } from '../controllers/booking-controller.js';

const bookingsRouter = express.Router();

bookingsRouter.get("/:id", getBookingById);

bookingsRouter.post("/",newBooking);

bookingsRouter.delete("/:id",newBooking);

export default bookingsRouter;
