import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import NoteRouter from './routers/noteRouter';
import UserRouter from './routers/userRouter';
import AuthRouter from './routers/authRouter';
import { logger } from './utils/logger';
import { config } from './utils/config';
import { DEFAULT_LOG_LEVEL, DEFAULT_PORT } from './utils/constants';
import { requireAuth } from './middleware/requireAuth';
import { requireAdmin } from './middleware/requireAdmin';
import { testDatabaseConnection } from './services/databaseService';
import { Sequelize } from 'sequelize';
import { initModels } from './models';
import { csrf } from 'lusca';
const errorHandler = require('./middleware/errorHandler');

// Validate config
require('./utils/config');

const app = express();
const port = config.PORT ?? DEFAULT_PORT;

// Middleware
if (config.NODE_ENV === 'development') {
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
}
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny', { 
  stream: { 
    write: (message: string) => logger.http(message.trim()) 
  }
}));

// Connect to DB
export const sequelize = new Sequelize(
        config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
        host: config.DB_HOST,
        dialect: 'mysql',
        logging: msg => logger.debug(msg)
    });
testDatabaseConnection(sequelize);
initModels();

// Health check route
app.get('/api', (req, res) => res.status(200).json('OK'));

// Public routers
app.use("/api/auth", AuthRouter);

// Protected routers
app.use("/api/notes", requireAuth, NoteRouter);
app.use("/api/users", requireAuth, requireAdmin, UserRouter);

// Custom error handler
app.use(errorHandler);
app.use(csrf());

// Start server
app.listen(port, () => {
  logger.info(`Express is listening at http://localhost:${port}`);
  logger.info(`Log level: ${config.LOG_LEVEL ?? DEFAULT_LOG_LEVEL}`)
});