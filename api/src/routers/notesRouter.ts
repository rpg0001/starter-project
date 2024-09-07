import { Router } from "express";
import * as NotesController from "../controllers/notesController";

const NotesRouter = Router();

NotesRouter.get("/notes/:id", NotesController.getNote);
NotesRouter.get("/notes", NotesController.listNotes);
NotesRouter.post("/notes", NotesController.createNote);
NotesRouter.patch("/notes/:id", NotesController.updateNote);
NotesRouter.delete("/notes/:id", NotesController.deleteNote);

export default NotesRouter;
