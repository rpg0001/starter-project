import * as NotesModel from '../models/notesModel';

export async function getNote(req: any, res: any) {
    const id = Number(req.params.id);
    try {
        if (isNaN(id)) {
            console.error(`Bad request - Id (${id}) must be a number`);
            return res.status(400).json();
        }
    
        const note = await NotesModel.getNote(req.params.id);
        
        if (!note) {
            console.error(`Not found - No note found matching id ${id}`);
            return res.status(404).json();
        }

        return res.status(200).json(note);
    } catch (error: any) {
        console.error(`Error retrieving note with id ${id}: ${error.message}`);
        return res.status(500).json();
    }
}

export async function listNotes(req: any, res: any) {
    try {
        const notes = await NotesModel.listNotes();
        return res.status(200).json(notes);
    } catch (error: any) {
        console.error(`Error retrieving notes: ${error.message}`);
        return res.status(500).json();
    }
}

export async function createNote(req: any, res: any) {
    try {
        const title = req.body?.title;
        const content = req.body?.content;

        if (!title || !content) {
            const message = `Bad request - title or content not provided`;
            console.error(`Bad request - title or content not provided`);
            return res.status(400).json(message);
        }

        const note = await NotesModel.createNote(title, content);
        return res.status(201).json(note);
    } catch (error: any) {
        console.error(`Error creating note: ${error.message}`);
        return res.status(500).json();
    }
}

export async function updateNote(req: any, res: any) {
    return res.status(204).json({ "note": "Hello updated world!"});
}

export async function deleteNote(req: any, res: any) {
    return res.status(204).json({});
}