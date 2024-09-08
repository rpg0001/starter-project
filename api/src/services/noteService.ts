import { connection } from "../app";
import { Note } from "../models/noteModels";
import { NotFoundError } from "../utils/errors";

export async function getNote(
    id: number
): Promise<Note | null> {
    const result = await connection.query(`
        SELECT * FROM notes WHERE id = ?`
    , [id]);
    const rows = result[0] as any[];
    const note = rows[0];
    return note ? new Note(note.id, note.title, note.content) : null;
}

export async function listNotes(): Promise<Note[]>  {
    const [notes] = await connection.query(`
        SELECT * FROM notes
    `);
    return (notes as any[]).map(note => new Note(note.id, note.title, note.content))
}

export async function createNote(
    title: string, 
    content: string
): Promise<Note | null>  {
    const [newNote] = await connection.query(`
        INSERT INTO notes (title, content)
        VALUES (?, ?)
    `, [ title, content ]) as any;

    return await getNote(newNote.insertId) ?? null;
}

export async function updateNote(
    id: number, 
    title: string, 
    content: string
): Promise<Note | null>  {
    const note = await getNote(id);

    if (!note) throw new NotFoundError(`Could not find note with id ${id}`);

    const newTitle = title ?? note.title;
    const newContent = content ?? note.content;
    
    const result = await connection.query(`
        UPDATE notes
        SET title = ?, content = ?
        WHERE id = ?
    `, [newTitle, newContent, id]) as any;

    return await getNote(id) ?? null;
}

export async function deleteNote(
    id: number
) {
    await connection.query(`
        DELETE FROM notes
        WHERE id = ?
    `, [id]);
}