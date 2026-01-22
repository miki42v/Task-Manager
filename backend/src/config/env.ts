import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: parseInt(process.env.PORT || '3001', 10),
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'default-access-secret',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret',
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
};
