import { mapToJsonApiListResponse } from '../maps/jsonApiMaps';
import { mapNoteToJsonApiObjectResponse } from '../maps/notesMaps';
import { Note } from '../models/notesModels';
import * as Service from '../services/notesService';
import { BadRequestError, NotFoundError } from '../utils/errors';

export async function getNote(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) throw new BadRequestError('/id', 'Id must be a number');

        const note = await Service.getNote(req.params.id);
        if (!note) throw new NotFoundError(`Could not find note with id ${id}`);

        res.status(200).json(mapNoteToJsonApiObjectResponse(note));
    } catch (error: any) {
        return next(error);
    }
}

export async function listNotes(req: any, res: any, next: any) {
    try {
        const notes = await Service.listNotes();
        return res.status(200).json(
            mapToJsonApiListResponse(
                notes.map((note: Note) => mapNoteToJsonApiObjectResponse(note))
            )
        );
    } catch (error: any) {
        next(error);
    }
}

export async function createNote(req: any, res: any, next: any) {
    try {
        const title = req.body?.title;
        const content = req.body?.content;

        if (!title) throw new BadRequestError('/title');
        if (!content) throw new BadRequestError('/content');

        const note = await Service.createNote(title, content);
        return res.status(201).json(mapNoteToJsonApiObjectResponse(note));
    } catch (error: any) {
        next(error);
    }
}

export async function updateNote(req: any, res: any, next: any) {
    const id = Number(req.params.id);
    try {
        const title = req.body?.title;
        const content = req.body?.content;

        if (isNaN(id)) throw new BadRequestError('/id');
        if (!title && !content) throw new BadRequestError('/body');
        
        const note = await Service.updateNote(id, title, content);
        return res.status(200).json(mapNoteToJsonApiObjectResponse(note));
    } catch (error: any) {
        next(error);
    }
}

export async function deleteNote(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) throw new BadRequestError('/id');
        
        await Service.deleteNote(req.params.id);
        return res.status(204).json();
    } catch (error: any) {
        next(error);
    }
}