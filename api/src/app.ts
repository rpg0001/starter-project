import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import morgan from 'morgan';
import NotesRouter from './routers/notesRouter';
import { validateEnvironment } from './utils/environmentConfig';

dotenv.config();

const app = express();
const port = 8080;

// Validate config
const configErrors = validateEnvironment();
if (configErrors.length > 0) {
  console.error(`Configuration errors: ${configErrors.join(", ")}`);
}

// Middleware
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    ['[',tokens.date(req, res),']'].join(''),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    ['(',tokens['response-time'](req, res), 'ms)'].join('')
  ].join(' ')
}));

// Connect to DB
export const connection = mysql.createPool({
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME']
}).promise();

// Health check
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Routers
app.use(NotesRouter);

// Start server
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
