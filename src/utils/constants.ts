import * as dotenv from "dotenv";
dotenv.config();

export const DEVELOPMENT_TOKEN_SECRET_KEY = process.env.DEVELOPMENT_TOKEN_SECRET_KEY;
export const PRODUCTION_TOKEN_SECRET_KEY = process.env.PRODUCTION_TOKEN_SECRET_KEY;
export const NODE_ENV = process.env.NODE_ENV;
export const SALT = process.env.SALT;
export const DB_URI_NOTES = process.env.DB_URI_NOTES;
export const allowedOrigins: string [] = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000',
    'http://localhost:8080',
    'https://harmonious-duckanoo-86463d.netlify.app',
    'https://dev--funny-lollipop-a5d339.netlify.app',
    'https://amazing-souffle-aa011f.netlify.app'
]; 
export const role = {
    user: "USER",
    admin: "ADMIN"
}
export const tokenExpiry = '30m'
