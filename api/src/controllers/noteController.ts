
import { Note } from '../models/noteModels';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { JsonApiObjectListResponse } from '../utils/successResponses';
import * as NoteService from '../services/noteService';

export async function getNote(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) throw new BadRequestError('/id', 'Id must be a number');

        const note = await NoteService.getNote(req.params.id);
        if (!note) throw new NotFoundError(`Could not find note with id ${id}`);

        res.status(200).json(note.getJsonApiResponse());
    } catch (error: any) {
        next(error);
    }
}

export async function listNotes(req: any, res: any, next: any) {
    try {
        const notes = await NoteService.listNotes();
        return res.status(200).json(
            new JsonApiObjectListResponse(
                notes.map((note: Note) => note.getJsonApiResponse())
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

        const note = await NoteService.createNote(title, content);
        return res.status(201).json(note?.getJsonApiResponse() ?? {});
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
        
        const note = await NoteService.updateNote(id, title, content);
        return res.status(200).json(note?.getJsonApiResponse() ?? {});
    } catch (error: any) {
        next(error);
    }
}

export async function deleteNote(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) throw new BadRequestError('/id');
        
        await NoteService.deleteNote(req.params.id);
        return res.status(204).json();
    } catch (error: any) {
        next(error);
    }
}