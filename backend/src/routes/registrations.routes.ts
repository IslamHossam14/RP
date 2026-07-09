import { Router, Request, Response } from 'express';
import { registrationService } from '../services/registration.service';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Get all registrations (Admin only)
router.get(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, search, status } = req.query;
    const { registrations, total } = await registrationService.getAllRegistrations(
      Number(page),
      Number(pageSize),
      search as string,
      status as string
    );
    return sendPaginated(res, registrations, total, Number(page), Number(pageSize));
  })
);

// Get user's registrations
router.get(
  '/user/my',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { page = 1, pageSize = 10 } = req.query;
    const { registrations, total } = await registrationService.getUserRegistrations(
      req.user!.userId,
      Number(page),
      Number(pageSize)
    );
    return sendPaginated(res, registrations, total, Number(page), Number(pageSize));
  })
);

// Get registration by ID
router.get(
  '/:id',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const registration = await registrationService.getRegistrationById(req.params.id);
    return sendSuccess(res, registration, 'Registration retrieved successfully');
  })
);

// Create registration
router.post(
  '/',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { courseId } = req.body;
    if (!courseId) {
      return sendError(res, 'Course ID is required', 'Missing courseId', 400);
    }
    const registration = await registrationService.createRegistration(req.user!.userId, courseId);
    return sendSuccess(res, registration, 'Registration created successfully', 201);
  })
);

// Update registration status (Admin only)
router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    if (!status) {
      return sendError(res, 'Status is required', 'Missing status', 400);
    }
    const registration = await registrationService.updateRegistrationStatus(req.params.id, status);
    return sendSuccess(res, registration, 'Registration status updated');
  })
);

// Complete registration (Admin only)
router.patch(
  '/:id/complete',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const registration = await registrationService.completeRegistration(req.params.id);
    return sendSuccess(res, registration, 'Registration completed');
  })
);

// Delete registration (Admin only)
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    await registrationService.deleteRegistration(req.params.id);
    return sendSuccess(res, {}, 'Registration deleted successfully');
  })
);

// Get registration stats (Admin only)
router.get(
  '/stats/all',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: Request, res: Response) => {
    const stats = await registrationService.getRegistrationStats();
    return sendSuccess(res, stats, 'Registration stats retrieved');
  })
);

export default router;
