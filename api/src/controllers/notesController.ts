import { mapToJsonApiListResponse } from '../maps/jsonApiMaps';
import { mapNoteToJsonApiObjectResponse } from '../maps/notesMaps';
import { Note } from '../models/notesModels';
import * as Service from '../services/notesService';
import { getBadRequestError, getInternalServerError, getNotFoundError } from '../utils/errorResponses';

export async function getNote(req: any, res: any) {
    const id = Number(req.params.id);
    try {
        if (isNaN(id)) return res.status(400).json(getBadRequestError('/id'));

        const note = await Service.getNote(req.params.id);

        if (!note) return res.status(404).json(getNotFoundError());

        return res.status(200).json(mapNoteToJsonApiObjectResponse(note));
    } catch (error: any) {
        console.error(`Error retrieving note with id ${id}: ${error.message}`);
        return res.status(500).json(getInternalServerError());
    }
}

export async function listNotes(req: any, res: any) {
    try {
        const notes = await Service.listNotes();
        return res.status(200).json(
            mapToJsonApiListResponse(
                notes.map((note: Note) => mapNoteToJsonApiObjectResponse(note))
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

        const note = await Service.createNote(title, content);
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
        
        const note = await Service.updateNote(id, title, content);
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
        
        await Service.deleteNote(req.params.id);
        return res.status(204).json();
    } catch (error: any) {
        console.error(`Error retrieving note with id ${id}: ${error.message}`);
        return res.status(500).json(getInternalServerError());
    }
}