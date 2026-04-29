import express from 'express';
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getMenuItems);
router.get('/:id', getMenuItem);
router.post('/', protect, admin, upload.single('image'), createMenuItem);
router.put('/:id', protect, admin, upload.single('image'), updateMenuItem);
router.delete('/:id', protect, admin, deleteMenuItem);

export default router;
