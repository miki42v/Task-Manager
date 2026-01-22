import { Response } from 'express';
import { taskService } from '../services/task.service';
import { createTaskSchema, updateTaskSchema, taskQuerySchema } from '../validators/task.validator';
import { AuthenticatedRequest } from '../types';

export class TaskController {
    async getTasks(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId!;
            const query = taskQuerySchema.parse(req.query);
            const result = await taskService.getTasks(userId, query);

            res.status(200).json({
                success: true,
                data: result.tasks,
                pagination: result.pagination,
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

    async getTaskById(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId!;
            const taskId = req.params.id as string;
            const task = await taskService.getTaskById(userId, taskId);

            res.status(200).json({
                success: true,
                data: task,
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

    async createTask(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId!;
            const data = createTaskSchema.parse(req.body);
            const task = await taskService.createTask(userId, data);

            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                data: task,
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

    async updateTask(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId!;
            const taskId = req.params.id as string;
            const data = updateTaskSchema.parse(req.body);
            const task = await taskService.updateTask(userId, taskId, data);

            res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                data: task,
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

    async toggleTaskStatus(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId!;
            const taskId = req.params.id as string;
            const task = await taskService.toggleTaskStatus(userId, taskId);

            res.status(200).json({
                success: true,
                message: 'Task status toggled successfully',
                data: task,
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

    async deleteTask(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId!;
            const taskId = req.params.id as string;
            const result = await taskService.deleteTask(userId, taskId);

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
}

export const taskController = new TaskController();
