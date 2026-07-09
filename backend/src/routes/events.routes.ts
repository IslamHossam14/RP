import { Router, Request, Response } from 'express';
import { eventService } from '../services/event.service';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { CreateEventSchema } from '../validators';

const router = Router();

// Get all events
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, type, status } = req.query;
    const { events, total } = await eventService.getAllEvents(
      Number(page),
      Number(pageSize),
      type as string,
      status as string
    );
    return sendPaginated(res, events, total, Number(page), Number(pageSize));
  })
);

// Get upcoming events
router.get(
  '/upcoming/featured',
  asyncHandler(async (req: Request, res: Response) => {
    const events = await eventService.getUpcomingEvents(5);
    return sendSuccess(res, events, 'Upcoming events retrieved');
  })
);

// Get event by ID
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const event = await eventService.getEventById(req.params.id);
    return sendSuccess(res, event, 'Event retrieved');
  })
);

// Create event (Admin only)
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validatedData = CreateEventSchema.parse(req.body);
    const event = await eventService.createEvent(validatedData);
    return sendSuccess(res, event, 'Event created', 201);
  })
);

// Update event (Admin only)
router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const event = await eventService.updateEvent(req.params.id, req.body);
    return sendSuccess(res, event, 'Event updated');
  })
);

// ===== Registration Routes =====

// Register for event
router.post(
  '/:id/register',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { attendeeCount = 1 } = req.body;
    const registration = await eventService.registerForEvent(
      req.user!.userId,
      req.params.id,
      attendeeCount
    );
    return sendSuccess(res, registration, 'Event registration created', 201);
  })
);

// Get user's event registrations
router.get(
  '/user/registrations',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { page = 1, pageSize = 10 } = req.query;
    const { registrations, total } = await eventService.getUserEventRegistrations(
      req.user!.userId,
      Number(page),
      Number(pageSize)
    );
    return sendPaginated(res, registrations, total, Number(page), Number(pageSize));
  })
);

// Get all registrations (Admin only)
router.get(
  '/admin/registrations',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, status } = req.query;
    const { registrations, total } = await eventService.getAllEventRegistrations(
      Number(page),
      Number(pageSize),
      status as string
    );
    return sendPaginated(res, registrations, total, Number(page), Number(pageSize));
  })
);

// Update registration status (Admin only)
router.patch(
  '/registration/:id/status',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    if (!status) {
      return sendError(res, 'Status is required', 'Missing status', 400);
    }
    const registration = await eventService.updateEventRegistrationStatus(req.params.id, status);
    return sendSuccess(res, registration, 'Registration status updated');
  })
);

// Get event stats (Admin only)
router.get(
  '/:id/stats',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const stats = await eventService.getEventStats(req.params.id);
    return sendSuccess(res, stats, 'Event stats retrieved');
  })
);

export default router;
