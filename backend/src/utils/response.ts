import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  } as ApiResponse<T>);
};

export const sendError = (
  res: Response,
  message: string,
  error?: string,
  statusCode: number = 500
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error || message,
    timestamp: new Date().toISOString(),
  } as ApiResponse);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  pageSize: number,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  const totalPages = Math.ceil(total / pageSize);
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    },
    timestamp: new Date().toISOString(),
  });
};
