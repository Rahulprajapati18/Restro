import express from 'express';
import { createOrder, getOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, admin, optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalProtect, createOrder);
router.get('/', protect, getOrders);
router.get('/all', protect, admin, getAllOrders);
router.put('/:id', protect, admin, updateOrderStatus);

export default router;
