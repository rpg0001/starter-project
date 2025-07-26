import { InternalServerError, NotFoundError } from "../utils/errors";
import { Note } from "../models/noteModel";


export async function getNote(
    id: number
): Promise<Note | null> {
    try {
        return await Note.findOne({
            where: {
                id: id
            },
            attributes: [
                "id",
                "title",
                "content",
                "userId"
            ]
        })
    } catch (error: any) {
        const message = `getNote error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function listNotes(userId: number | null): Promise<Note[]>  {
    try {
        return await Note.findAll({
            where: userId ? {
                userId: userId
            } : {},
            attributes: [
                "id",
                "title",
                "content",
                "userId"
            ]
        })
    } catch (error: any) {
        const message = `listNotes error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function createNote(
    title: string, 
    content: string,
    userId: number
): Promise<Note | null>  {
    try {
        return await Note.create({
            title: title,
            content: content,
            userId: userId
        })
    } catch (error: any) {
        const message = `createNote error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function updateNote(
    id: number, 
    title: string, 
    content: string
): Promise<Note | null>  {
    try {
        const note = await getNote(id);
        if (!note) throw new NotFoundError(`Could not find note with id ${id}`);

        const newTitle = title ?? note.title;
        const newContent = content ?? note.content;

        await Note.update(
            {
                title: newTitle,
                content: newContent
            },
            {
                where: {
                    id: id
                }
            }
        );

        return await getNote(id) ?? null;
    } catch (error: any) {
        const message = `updateNote error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function deleteNote(
    id: number
) {
    try {
        await Note.destroy({
            where: {
                id: id
            }
        })
    } catch (error: any) {
        const message = `deleteNote error: ${error.message}`;
        throw new InternalServerError(message);
    }
}