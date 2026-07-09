import { Response } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/response';
import { ValidationError } from '../utils/errors';
import { RegisterSchema, LoginSchema, UpdateProfileSchema } from '../validators';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
  async register(req: AuthRequest, res: Response) {
    try {
      const validatedData = RegisterSchema.parse(req.body);
      const result = await authService.register(validatedData);

      return sendSuccess(
        res,
        result,
        'User registered successfully',
        201
      );
    } catch (error: any) {
      if (error.issues) {
        return sendError(res, 'Validation error', error.errors?.[0]?.message || 'Invalid input', 400);
      }
      return sendError(res, error.message, error.message, error.statusCode || 500);
    }
  }

  async login(req: AuthRequest, res: Response) {
    try {
      const validatedData = LoginSchema.parse(req.body);
      const result = await authService.login(validatedData);

      return sendSuccess(res, result, 'Login successful', 200);
    } catch (error: any) {
      if (error.issues) {
        return sendError(res, 'Validation error', error.errors?.[0]?.message || 'Invalid input', 400);
      }
      return sendError(res, error.message, error.message, error.statusCode || 500);
    }
  }

  async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 'Not authenticated', 401);
      }

      const user = await authService.getUserById(req.user.userId);
      return sendSuccess(res, user, 'Profile retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.message, error.message, error.statusCode || 500);
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 'Not authenticated', 401);
      }

      const validatedData = UpdateProfileSchema.parse(req.body);
      const user = await authService.updateProfile(req.user.userId, validatedData);

      return sendSuccess(res, user, 'Profile updated successfully');
    } catch (error: any) {
      if (error.issues) {
        return sendError(res, 'Validation error', error.errors?.[0]?.message || 'Invalid input', 400);
      }
      return sendError(res, error.message, error.message, error.statusCode || 500);
    }
  }

  async changePassword(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 'Not authenticated', 401);
      }

      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return sendError(res, 'Old password and new password are required', 'Missing fields', 400);
      }

      const result = await authService.changePassword(req.user.userId, oldPassword, newPassword);
      return sendSuccess(res, result, 'Password changed successfully');
    } catch (error: any) {
      return sendError(res, error.message, error.message, error.statusCode || 500);
    }
  }
}

export const authController = new AuthController();
