import { mapToJsonApiListResponse } from '../maps/jsonApiMaps';
import { mapNoteToJsonApiObjectResponse } from '../maps/notesMaps';
import * as NotesModel from '../models/notesModel';
import { getBadRequestError, getInternalServerError, getNotFoundError } from '../utils/errors';

export async function getNote(req: any, res: any) {
    const id = Number(req.params.id);
    try {
        if (isNaN(id)) return res.status(400).json(getBadRequestError('/id'));

        const note = await NotesModel.getNote(req.params.id);

        if (!note) return res.status(404).json(getNotFoundError());

        return res.status(200).json(mapNoteToJsonApiObjectResponse(note));
    } catch (error: any) {
        console.error(`Error retrieving note with id ${id}: ${error.message}`);
        return res.status(500).json(getInternalServerError());
    }
}

export async function listNotes(req: any, res: any) {
    try {
        const notes = await NotesModel.listNotes();
        return res.status(200).json(
            mapToJsonApiListResponse(
                notes.map(note => mapNoteToJsonApiObjectResponse(note))
            )
        );
    } catch (error: any) {
        console.error(`Error retrieving notes: ${error.message}`);
        return res.status(500).json();
    }
}

export async function createNote(req: any, res: any) {
    try {
        const title = req.body?.title;
        const content = req.body?.content;

        if (!title) return res.status(400).json(getBadRequestError('/title'));
        if (!content) return res.status(400).json(getBadRequestError('/content'));

        const note = await NotesModel.createNote(title, content);
        return res.status(201).json(mapNoteToJsonApiObjectResponse(note));
    } catch (error: any) {
        console.error(`Error creating note: ${error.message}`);
        return res.status(500).json(getInternalServerError());
    }
}

export async function updateNote(req: any, res: any) {
    const id = Number(req.params.id);
    try {
        const title = req.body?.title;
        const content = req.body?.content;

        if (isNaN(id)) return res.status(400).json(getBadRequestError('/id'));
        if (!title && !content) return res.status(400).json(getBadRequestError('/body'));
        
        const note = await NotesModel.updateNote(id, title, content);
        return res.status(200).json(mapNoteToJsonApiObjectResponse(note));
    } catch (error: any) {
        console.error(`Error updaing note with id ${id}: ${error.message}`);
        return res.status(500).json(getInternalServerError());
    }
}

export async function deleteNote(req: any, res: any) {
    const id = Number(req.params.id);
    try {
        if (isNaN(id)) return res.status(400).json(getBadRequestError('/id'));
        
        await NotesModel.deleteNote(req.params.id);
        return res.status(204).json();
    } catch (error: any) {
        console.error(`Error retrieving note with id ${id}: ${error.message}`);
        return res.status(500).json(getInternalServerError());
    }
}