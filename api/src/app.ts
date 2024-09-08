import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import morgan from 'morgan';
import NoteRouter from './routers/noteRouter';
import { validateEnvironment } from './utils/environment';
import { logger } from './utils/logger';
const errorHandler = require('./middleware/errorHandler');

// Set up config and log if invalid
dotenv.config();
validateEnvironment();

const app = express();
const port = 8080;

// Middleware
app.use(express.json())
app.use(morgan('tiny', { 
  stream: { 
    write: (message: string) => logger.http(message.trim()) 
  }
}));

// Connect to DB
export const connection = mysql.createPool({
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME']
}).promise();

// Health check route
app.get('/', (req, res) => res.status(200).json('OK'));

// Routers
app.use(NoteRouter);

// Custom error handler
app.use(errorHandler);

// Start server
app.listen(port, () => logger.info(`Express is listening at http://localhost:${port}`));
