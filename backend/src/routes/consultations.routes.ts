import { Router, Request, Response } from 'express';
import { consultationService } from '../services/consultation.service';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { CreateConsultationSchema, BookConsultationSchema } from '../validators';

const router = Router();

// Get all consultations
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, type } = req.query;
    const { consultations, total } = await consultationService.getAllConsultations(
      Number(page),
      Number(pageSize),
      type as string
    );
    return sendPaginated(res, consultations, total, Number(page), Number(pageSize));
  })
);

// Get consultation by ID
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const consultation = await consultationService.getConsultationById(req.params.id);
    return sendSuccess(res, consultation, 'Consultation retrieved');
  })
);

// Create consultation (Admin only)
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validatedData = CreateConsultationSchema.parse(req.body);
    const consultation = await consultationService.createConsultation(validatedData);
    return sendSuccess(res, consultation, 'Consultation created', 201);
  })
);

// Book consultation
router.post(
  '/:id/book',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { date, time } = req.body;
    if (!date || !time) {
      return sendError(res, 'Date and time are required', 'Missing fields', 400);
    }
    const booking = await consultationService.bookConsultation(
      req.user!.userId,
      req.params.id,
      date,
      time
    );
    return sendSuccess(res, booking, 'Consultation booked successfully', 201);
  })
);

// Get user bookings
router.get(
  '/user/bookings',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { page = 1, pageSize = 10 } = req.query;
    const { bookings, total } = await consultationService.getUserBookings(
      req.user!.userId,
      Number(page),
      Number(pageSize)
    );
    return sendPaginated(res, bookings, total, Number(page), Number(pageSize));
  })
);

// Get all bookings (Admin only)
router.get(
  '/admin/bookings',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, status } = req.query;
    const { bookings, total } = await consultationService.getAllBookings(
      Number(page),
      Number(pageSize),
      status as string
    );
    return sendPaginated(res, bookings, total, Number(page), Number(pageSize));
  })
);

// Update booking status (Admin only)
router.patch(
  '/booking/:id/status',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    if (!status) {
      return sendError(res, 'Status is required', 'Missing status', 400);
    }
    const booking = await consultationService.updateBookingStatus(req.params.id, status);
    return sendSuccess(res, booking, 'Booking status updated');
  })
);

// Cancel booking
router.post(
  '/booking/:id/cancel',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const booking = await consultationService.cancelBooking(req.params.id);
    return sendSuccess(res, booking, 'Booking cancelled');
  })
);

export default router;
