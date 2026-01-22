import { prisma } from '../lib/prisma';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { RegisterInput, LoginInput } from '../validators/auth.validator';

export class AuthService {
    async register(data: RegisterInput) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw { status: 400, message: 'Email already registered' };
        }

        const hashedPassword = await hashPassword(data.password);
        const refreshToken = generateRefreshToken(data.email);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                refreshToken,
            },
        });

        const accessToken = generateAccessToken(user.id);

        return {
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            },
            accessToken,
            refreshToken,
        };
    }

    async login(data: LoginInput) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw { status: 401, message: 'Invalid email or password' };
        }

        const isValidPassword = await comparePassword(data.password, user.password);

        if (!isValidPassword) {
            throw { status: 401, message: 'Invalid email or password' };
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            },
            accessToken,
            refreshToken,
        };
    }

    async refresh(refreshToken: string) {
        const payload = verifyRefreshToken(refreshToken);

        if (!payload) {
            throw { status: 401, message: 'Invalid or expired refresh token' };
        }

        const user = await prisma.user.findFirst({
            where: {
                id: payload.userId,
                refreshToken,
            },
        });

        if (!user) {
            throw { status: 401, message: 'Invalid refresh token' };
        }

        const newAccessToken = generateAccessToken(user.id);
        const newRefreshToken = generateRefreshToken(user.id);

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken },
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }

    async logout(userId: string) {
        await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });

        return { message: 'Logged out successfully' };
    }

    async getUserById(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw { status: 404, message: 'User not found' };
        }

        return user;
    }
}

export const authService = new AuthService();
