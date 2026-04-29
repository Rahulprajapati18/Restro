import express from 'express';
import {
  createBooking,
  getBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking
} from '../controllers/bookingController.js';
import { protect, admin, optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalProtect, createBooking);
router.get('/', protect, getBookings);
router.get('/all', protect, admin, getAllBookings);
router.put('/:id', protect, admin, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

export default router;
