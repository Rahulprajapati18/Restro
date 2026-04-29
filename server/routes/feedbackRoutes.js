import express from 'express';
import { createFeedback, getAllFeedback } from '../controllers/feedbackController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createFeedback);                    // anyone can submit
router.get('/all', protect, admin, getAllFeedback);  // admin only

export default router;
