import * as dotenv from "dotenv";
dotenv.config();

export const DEVELOPMENT_TOKEN_SECRET_KEY = process.env.DEVELOPMENT_TOKEN_SECRET_KEY;
export const PRODUCTION_TOKEN_SECRET_KEY = process.env.PRODUCTION_TOKEN_SECRET_KEY;
export const NODE_ENV = process.env.NODE_ENV;
export const SALT = process.env.SALT;
export const allowedOrigins: string [] = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000'
]; 
export const role = {
    user: "USER",
    admin: "ADMIN"
}
export const tokenExpiry = '10m'
