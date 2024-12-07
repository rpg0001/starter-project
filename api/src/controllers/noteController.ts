
import { Note } from '../models/noteModel';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { JsonApiResourceList } from '../utils/jsonApi';
import * as NoteService from '../services/noteService';

export async function getNote(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');

        const note = await NoteService.getNote(req.params.id);
        if (!note) throw new NotFoundError(`Could not find note with id ${id}`);
        res.status(200).json(note.getJsonApiResponse(true));
    } catch (error: any) {
        next(error);
    }
}

export async function listNotes(req: any, res: any, next: any) {
    try {
        const notes = await NoteService.listNotes();
        return res.status(200).json(
            new JsonApiResourceList(
                notes.map((note: Note) => note.getJsonApiResponse(true))
            )
        );
    } catch (error: any) {
        next(error);
    }
}

export async function createNote(req: any, res: any, next: any) {
    try {
        const title = req.body?.attributes?.title;
        const content = req.body?.attributes?.content;

        if (!title) throw new BadRequestError('/body/attributes/title', 'missing required field: title');
        if (!content) throw new BadRequestError('/body/attributes/content', 'missing required field: content');

        const note = await NoteService.createNote(title, content);
        return res.status(201).json(note?.getJsonApiResponse(true) ?? {});
    } catch (error: any) {
        next(error);
    }
}

export async function updateNote(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);
        const title = req.body?.attributes?.title;
        const content = req.body?.attributes?.content;

        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');
        if (!title && !content) throw new BadRequestError('/body/attributes', 'missing required field: title, content');
        if (title && title.length > 255) throw new BadRequestError('/body/attributes/title', 'title must be 255 characters or less');
        if (content && content.length > 1023) throw new BadRequestError('/body/attributes/content', 'content must be 1023 characters or less');

        const note = await NoteService.updateNote(id, title, content);
        return res.status(200).json(note?.getJsonApiResponse(true) ?? {});
    } catch (error: any) {
        next(error);
    }
}

export async function deleteNote(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');

        await NoteService.deleteNote(req.params.id);
        return res.status(204).json();
    } catch (error: any) {
        next(error);
    }
}