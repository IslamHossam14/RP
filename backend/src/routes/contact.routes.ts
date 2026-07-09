import { Router, Request, Response } from 'express';
import { contactService } from '../services/contact.service';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { CreateContactSchema } from '../validators';

const router = Router();

// Create contact message
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const validatedData = CreateContactSchema.parse(req.body);
    const contact = await contactService.createContact(validatedData);
    return sendSuccess(res, contact, 'Message sent successfully', 201);
  })
);

// Get all contacts (Admin only)
router.get(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, status, search } = req.query;
    const { contacts, total } = await contactService.getAllContacts(
      Number(page),
      Number(pageSize),
      status as string,
      search as string
    );
    return sendPaginated(res, contacts, total, Number(page), Number(pageSize));
  })
);

// Get contact by ID (Admin only)
router.get(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const contact = await contactService.getContactById(req.params.id);
    return sendSuccess(res, contact, 'Contact retrieved');
  })
);

// Update contact status (Admin only)
router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    if (!status) {
      return sendError(res, 'Status is required', 'Missing status', 400);
    }
    const contact = await contactService.updateContactStatus(req.params.id, status);
    return sendSuccess(res, contact, 'Contact status updated');
  })
);

// Delete contact (Admin only)
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    await contactService.deleteContact(req.params.id);
    return sendSuccess(res, {}, 'Contact deleted');
  })
);

// Get contact stats (Admin only)
router.get(
  '/stats/all',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: Request, res: Response) => {
    const stats = await contactService.getContactStats();
    return sendSuccess(res, stats, 'Contact stats retrieved');
  })
);

export default router;
