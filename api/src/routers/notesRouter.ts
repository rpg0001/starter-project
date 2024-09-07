import { Router } from "express";
import * as Controller from "../controllers/notesController";

const NotesRouter = Router();

NotesRouter.get("/notes/:id", Controller.getNote);
NotesRouter.get("/notes", Controller.listNotes);
NotesRouter.post("/notes", Controller.createNote);
NotesRouter.patch("/notes/:id", Controller.updateNote);
NotesRouter.delete("/notes/:id", Controller.deleteNote);

export default NotesRouter;
