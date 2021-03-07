import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;

export const FRONTEND_CORS_URL = process.env.FRONTEND_CORS_URL || `http://localhost:${PORT}`;

export const MONGODB_URI = process.env.MONGODB_URI;
