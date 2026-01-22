export interface User {
    id: string;
    email: string;
    createdAt: string;
}

export interface Task {
    id: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}

export interface TasksResponse {
    success: boolean;
    data: Task[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface TaskResponse {
    success: boolean;
    data: Task;
    message?: string;
}

export interface ApiError {
    success: false;
    error: string;
    details?: Array<{ field: string; message: string }>;
}
