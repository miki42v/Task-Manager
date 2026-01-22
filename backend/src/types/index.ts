import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export interface AuthenticatedRequest extends Request<ParamsDictionary> {
    userId?: string;
}

export interface TokenPayload {
    userId: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
