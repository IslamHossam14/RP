import { Router, Request, Response } from 'express';
import { courseService } from '../services/course.service';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { CreateCourseSchema, PaginationSchema } from '../validators';

const router = Router();

// Get all courses
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, search, category } = req.query;
    const { courses, total } = await courseService.getAllCourses(
      Number(page),
      Number(pageSize),
      search as string,
      category as string
    );
    return sendPaginated(res, courses, total, Number(page), Number(pageSize), 'Courses retrieved successfully');
  })
);

// Get featured courses
router.get('/featured', asyncHandler(async (req: Request, res: Response) => {
  const courses = await courseService.getFeaturedCourses(3);
  return sendSuccess(res, courses, 'Featured courses retrieved');
}));

// Get course by ID
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const course = await courseService.getCourseById(req.params.id);
    return sendSuccess(res, course, 'Course retrieved successfully');
  })
);

// Create course (Admin only)
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validatedData = CreateCourseSchema.parse(req.body);
    const course = await courseService.createCourse(validatedData);
    return sendSuccess(res, course, 'Course created successfully', 201);
  })
);

// Update course (Admin only)
router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validatedData = CreateCourseSchema.partial().parse(req.body);
    const course = await courseService.updateCourse(req.params.id, validatedData);
    return sendSuccess(res, course, 'Course updated successfully');
  })
);

// Delete course (Admin only)
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    await courseService.deleteCourse(req.params.id);
    return sendSuccess(res, {}, 'Course deleted successfully');
  })
);

// Update course status (Admin only)
router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    if (!status) {
      return sendError(res, 'Status is required', 'Missing status', 400);
    }
    const course = await courseService.updateCourseStatus(req.params.id, status);
    return sendSuccess(res, course, 'Course status updated');
  })
);

// Get course stats (Admin only)
router.get(
  '/:id/stats',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const stats = await courseService.getCourseStats(req.params.id);
    return sendSuccess(res, stats, 'Course stats retrieved');
  })
);

export default router;
