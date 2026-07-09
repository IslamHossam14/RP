import { Router, Request, Response } from 'express';
import { studioService } from '../services/studio.service';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { CreateStudioServiceSchema, CreateStudioRequestSchema } from '../validators';

const router = Router();

// ===== Services Routes =====

// Get all services
router.get(
  '/services',
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, type } = req.query;
    const { services, total } = await studioService.getAllServices(
      Number(page),
      Number(pageSize),
      type as string
    );
    return sendPaginated(res, services, total, Number(page), Number(pageSize));
  })
);

// Get service by ID
router.get(
  '/services/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const service = await studioService.getServiceById(req.params.id);
    return sendSuccess(res, service, 'Service retrieved');
  })
);

// Create service (Admin only)
router.post(
  '/services',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validatedData = CreateStudioServiceSchema.parse(req.body);
    const service = await studioService.createService(validatedData);
    return sendSuccess(res, service, 'Service created', 201);
  })
);

// Update service (Admin only)
router.put(
  '/services/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const service = await studioService.updateService(req.params.id, req.body);
    return sendSuccess(res, service, 'Service updated');
  })
);

// ===== Requests Routes =====

// Get all requests (Admin only)
router.get(
  '/requests',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, status } = req.query;
    const { requests, total } = await studioService.getAllRequests(
      Number(page),
      Number(pageSize),
      status as string
    );
    return sendPaginated(res, requests, total, Number(page), Number(pageSize));
  })
);

// Get user's requests
router.get(
  '/requests/user/my',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { page = 1, pageSize = 10 } = req.query;
    const { requests, total } = await studioService.getUserRequests(
      req.user!.userId,
      Number(page),
      Number(pageSize)
    );
    return sendPaginated(res, requests, total, Number(page), Number(pageSize));
  })
);

// Get request by ID
router.get(
  '/requests/:id',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const request = await studioService.getRequestById(req.params.id);
    return sendSuccess(res, request, 'Request retrieved');
  })
);

// Create request
router.post(
  '/requests',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validatedData = CreateStudioRequestSchema.parse(req.body);
    const request = await studioService.createStudioRequest(req.user!.userId, validatedData);
    return sendSuccess(res, request, 'Request created', 201);
  })
);

// Update request status (Admin only)
router.patch(
  '/requests/:id/status',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    if (!status) {
      return sendError(res, 'Status is required', 'Missing status', 400);
    }
    const request = await studioService.updateRequestStatus(req.params.id, status);
    return sendSuccess(res, request, 'Request status updated');
  })
);

export default router;
