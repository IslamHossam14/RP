import { Router, Request, Response } from 'express';
import { paymentService } from '../services/payment.service';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { CreatePaymentSchema } from '../validators';

const router = Router();

// Get all payments (Admin only)
router.get(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, search, status } = req.query;
    const { payments, total } = await paymentService.getAllPayments(
      Number(page),
      Number(pageSize),
      search as string,
      status as string
    );
    return sendPaginated(res, payments, total, Number(page), Number(pageSize));
  })
);

// Get user's payments
router.get(
  '/user/my',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { page = 1, pageSize = 10 } = req.query;
    const { payments, total } = await paymentService.getUserPayments(
      req.user!.userId,
      Number(page),
      Number(pageSize)
    );
    return sendPaginated(res, payments, total, Number(page), Number(pageSize));
  })
);

// Get payment by ID
router.get(
  '/:id',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const payment = await paymentService.getPaymentById(req.params.id);
    return sendSuccess(res, payment, 'Payment retrieved successfully');
  })
);

// Create payment
router.post(
  '/',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validatedData = CreatePaymentSchema.parse(req.body);
    const payment = await paymentService.createPayment(req.user!.userId, validatedData);
    return sendSuccess(res, payment, 'Payment created successfully', 201);
  })
);

// Update payment status (Admin only)
router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    if (!status) {
      return sendError(res, 'Status is required', 'Missing status', 400);
    }
    const payment = await paymentService.updatePaymentStatus(req.params.id, status);
    return sendSuccess(res, payment, 'Payment status updated');
  })
);

// Complete payment
router.post(
  '/:id/complete',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { transactionId } = req.body;
    const payment = await paymentService.completePayment(req.params.id, transactionId);
    return sendSuccess(res, payment, 'Payment completed successfully');
  })
);

// Refund payment (Admin only)
router.post(
  '/:id/refund',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const payment = await paymentService.refundPayment(req.params.id);
    return sendSuccess(res, payment, 'Payment refunded successfully');
  })
);

// Get payment stats (Admin only)
router.get(
  '/stats/all',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: Request, res: Response) => {
    const stats = await paymentService.getPaymentStats();
    return sendSuccess(res, stats, 'Payment stats retrieved');
  })
);

export default router;
