import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { registerSchema, loginSchema, refreshSchema } from '../validators/auth.validator';
import { AuthenticatedRequest } from '../types';

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const data = registerSchema.parse(req.body);
            const result = await authService.register(data);

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result,
            });
        } catch (error: any) {
            if (error.status) {
                res.status(error.status).json({
                    success: false,
                    error: error.message,
                });
                return;
            }
            throw error;
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = loginSchema.parse(req.body);
            const result = await authService.login(data);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result,
            });
        } catch (error: any) {
            if (error.status) {
                res.status(error.status).json({
                    success: false,
                    error: error.message,
                });
                return;
            }
            throw error;
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const data = refreshSchema.parse(req.body);
            const result = await authService.refresh(data.refreshToken);

            res.status(200).json({
                success: true,
                message: 'Token refreshed successfully',
                data: result,
            });
        } catch (error: any) {
            if (error.status) {
                res.status(error.status).json({
                    success: false,
                    error: error.message,
                });
                return;
            }
            throw error;
        }
    }

    async logout(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId!;
            const result = await authService.logout(userId);

            res.status(200).json({
                success: true,
                message: result.message,
            });
        } catch (error: any) {
            if (error.status) {
                res.status(error.status).json({
                    success: false,
                    error: error.message,
                });
                return;
            }
            throw error;
        }
    }

    async me(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId!;
            const user = await authService.getUserById(userId);

            res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error: any) {
            if (error.status) {
                res.status(error.status).json({
                    success: false,
                    error: error.message,
                });
                return;
            }
            throw error;
        }
    }
}

export const authController = new AuthController();
