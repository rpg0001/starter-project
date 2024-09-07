import express from 'express';
import mysql from 'mysql2';
import morgan from 'morgan';
import NotesRouter from './routers/notesRouter';

const app = express();
const port = 8080;

// Middleware
app.use(morgan(function (tokens, req, res) {
  return [
    ['[',tokens.date(req, res),']'].join(''),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    ['(',tokens['response-time'](req, res), 'ms)'].join('')
  ].join(' ')
}));
app.use(express.json())

// Connect to DB
export const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Password@1',
    database: 'notes_app'
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
