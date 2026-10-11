import { Router } from 'express';
import asyncHandler from '../../utils/async-handler.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import {
  submitEnquiry,
  listPublicEnquiries,
  claimEnquiryHandler,
  listMyEnquiries,
} from './enquiry.controller.js';

const router = Router();

router.post('/', asyncHandler(submitEnquiry));
router.get('/public', authMiddleware, asyncHandler(listPublicEnquiries));
router.get('/mine', authMiddleware, asyncHandler(listMyEnquiries));
router.patch('/:id/claim', authMiddleware, asyncHandler(claimEnquiryHandler));

export default router;
