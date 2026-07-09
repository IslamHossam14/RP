import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details || err.message,
      timestamp: new Date().toISOString(),
    });
  }

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const code = (err as any).code;
    if (code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Unique constraint violation',
        error: 'This resource already exists',
        timestamp: new Date().toISOString(),
      });
    }
    if (code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
        error: 'The requested resource does not exist',
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Validation errors
  if ((err as any).issues) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: (err as any).issues,
      timestamp: new Date().toISOString(),
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message || 'Something went wrong',
    timestamp: new Date().toISOString(),
  });
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
