import * as dotenv from "dotenv";
dotenv.config();

export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
export const NODE_ENV = process.env.NODE_ENV;
export const SALT = process.env.SALT;
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
export const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;