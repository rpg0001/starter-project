import * as NotesModel from '../models/notesModel';

export async function getNote(req: any, res: any) {
    const note = await NotesModel.getNote(req.params.id);
    res.status(200).json(note);
}

export async function listNotes(req: any, res: any) {
    const notes = await NotesModel.listNotes();
    res.status(200).json(notes);
}

export async function createNote(req: any, res: any) {
    res.status(201).json({ "note": "Hello world!"});
}

export async function updateNote(req: any, res: any) {
    res.status(204).json({ "note": "Hello updated world!"});
}

export async function deleteNote(req: any, res: any) {
    res.status(204).json({});
}