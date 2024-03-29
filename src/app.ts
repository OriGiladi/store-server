import express, { Application } from 'express';
import mongoose from 'mongoose';
import { Request } from "express";
import cors from 'cors'; 
import bodyParser from 'body-parser';
import { UserModel } from './models/user.model';
import { authMiddleware } from './middlewares/auth';
import indexRouter from './routes';
import errorHandler from './middlewares/error-handler';
import {errors} from 'celebrate';
import { errorLogger, requestLogger } from './middlewares/logger.js';
import adminRouter from './routes/admin';
import { allowedOrigins } from './utils/constants';
import { DB_URI_NOTES } from './utils/constants'
const app: Application = express();

mongoose
.connect(DB_URI_NOTES as string)
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB', error.message);
    process.exit(1);
});

app.use(requestLogger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors<Request>({ origin: allowedOrigins, methods: "GET,HEAD,PUT,PATCH,POST,DELETE" })); 

app.use(indexRouter)

app.use(authMiddleware); // middleware to check token (authentication)

app.use('/users/me', async (req, res) => {
    const { id } = res.locals.user;
    const user = await UserModel.findById(id)
    // error handling
    res.send(user)  
});

app.use(adminRouter)

app.use(errorLogger); // winstons error logger middleware

app.use(errors()); // celecbrate middleware

app.use(errorHandler); // error handler middleware

export default app;

