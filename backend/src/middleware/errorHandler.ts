import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', err);

    if (err instanceof ZodError) {
        const issues = err.issues || [];
        res.status(400).json({
            success: false,
            error: 'Validation error',
            details: issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
            })),
        });
        return;
    }

    res.status(500).json({
        success: false,
        error: 'Internal server error',
    });
};
