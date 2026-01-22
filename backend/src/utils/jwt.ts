import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { config } from '../config/env';
import { TokenPayload } from '../types';

export const generateAccessToken = (userId: string): string => {
    const options: SignOptions = {
        expiresIn: config.accessTokenExpiry as jwt.SignOptions['expiresIn'],
    };
    return jwt.sign({ userId }, config.accessTokenSecret as Secret, options);
};

export const generateRefreshToken = (userId: string): string => {
    const options: SignOptions = {
        expiresIn: config.refreshTokenExpiry as jwt.SignOptions['expiresIn'],
    };
    return jwt.sign({ userId }, config.refreshTokenSecret as Secret, options);
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, config.accessTokenSecret as Secret) as TokenPayload;
    } catch {
        return null;
    }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, config.refreshTokenSecret as Secret) as TokenPayload;
    } catch {
        return null;
    }
};
