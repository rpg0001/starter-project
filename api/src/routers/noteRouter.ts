import { Router } from "express";
import * as NoteController from "../controllers/noteController";

const router = Router();

router.get("/notes/:id", NoteController.getNote);
router.get("/notes", NoteController.listNotes);
router.post("/notes", NoteController.createNote);
router.patch("/notes/:id", NoteController.updateNote);
router.delete("/notes/:id", NoteController.deleteNote);

export default router;
