import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mysql from 'mysql2';
import morgan from 'morgan';
import cors from 'cors';
import NoteRouter from './routers/noteRouter';
import { logger } from './utils/logger';
import { config } from './utils/config';
import { DEFAULT_LOG_LEVEL, DEFAULT_PORT } from './utils/constants';
const errorHandler = require('./middleware/errorHandler');

// Validate config
require('./utils/config');

const app = express();
const port = config.PORT ?? DEFAULT_PORT;

// Middleware
if (config.NODE_ENV === 'development') app.use(cors());
app.use(express.json());
app.use(morgan('tiny', { 
  stream: { 
    write: (message: string) => logger.http(message.trim()) 
  }
}));

// Connect to DB
export const connection = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
}).promise();

// Health check route
app.get('/', (req, res) => res.status(200).json('OK'));

// Routers
app.use(NoteRouter);

// Custom error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`Express is listening at http://localhost:${port}`);
  logger.info(`Log level: ${config.LOG_LEVEL ?? DEFAULT_LOG_LEVEL}`)
});