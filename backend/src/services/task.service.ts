import { prisma, TaskStatus } from '../lib/prisma';
import { CreateTaskInput, UpdateTaskInput, TaskQueryInput } from '../validators/task.validator';

export class TaskService {
    async getTasks(userId: string, query: TaskQueryInput) {
        const { page = 1, limit = 10, status, search } = query;
        const skip = (page - 1) * limit;

        const where: any = { userId };

        if (status) {
            where.status = status;
        }

        if (search) {
            where.title = {
                contains: search,
            };
        }

        const [tasks, total] = await Promise.all([
            prisma.task.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.task.count({ where }),
        ]);

        return {
            tasks,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getTaskById(userId: string, taskId: string) {
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId,
            },
        });

        if (!task) {
            throw { status: 404, message: 'Task not found' };
        }

        return task;
    }

    async createTask(userId: string, data: CreateTaskInput) {
        const task = await prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                status: (data.status as TaskStatus) || TaskStatus.PENDING,
                userId,
            },
        });

        return task;
    }

    async updateTask(userId: string, taskId: string, data: UpdateTaskInput) {
        const existingTask = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId,
            },
        });

        if (!existingTask) {
            throw { status: 404, message: 'Task not found' };
        }

        const task = await prisma.task.update({
            where: { id: taskId },
            data: {
                ...(data.title && { title: data.title }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.status && { status: data.status as TaskStatus }),
            },
        });

        return task;
    }

    async toggleTaskStatus(userId: string, taskId: string) {
        const existingTask = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId,
            },
        });

        if (!existingTask) {
            throw { status: 404, message: 'Task not found' };
        }

        const newStatus =
            existingTask.status === TaskStatus.COMPLETED
                ? TaskStatus.PENDING
                : TaskStatus.COMPLETED;

        const task = await prisma.task.update({
            where: { id: taskId },
            data: { status: newStatus },
        });

        return task;
    }

    async deleteTask(userId: string, taskId: string) {
        const existingTask = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId,
            },
        });

        if (!existingTask) {
            throw { status: 404, message: 'Task not found' };
        }

        await prisma.task.delete({
            where: { id: taskId },
        });

        return { message: 'Task deleted successfully' };
    }
}

export const taskService = new TaskService();
