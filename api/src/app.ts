import express from 'express';
import NotesRouter from './routers/notesRouter';
import morgan from "morgan";

const app = express();
const port = 8080;

app.use(morgan("tiny"));

app.get('/', (req, res) => {
  res.status(200).send("OK");
});

app.use(NotesRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
