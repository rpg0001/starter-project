import { connection } from "../app";
import { Note } from "../models/notesModels";

export async function getNote(
    id: number
): Promise<Note> {
    const result = await connection.query(`
        SELECT * FROM notes WHERE id = ?`
    , [id]);
    const rows = result[0] as any[];
    const note = rows[0];
    return new Note(note.id, note.title, note.content);
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
): Promise<Note>  {
    const [newNote] = await connection.query(`
        INSERT INTO notes (title, content)
        VALUES (?, ?)
    `, [ title, content ]) as any;

    return await getNote(newNote.insertId);
}

export async function updateNote(
    id: number, 
    title: string, 
    content: string
): Promise<Note>  {
    const note = await getNote(id);
    const newTitle = title ?? note.title;
    const newContent = content ?? note.content;
    
    const result = await connection.query(`
        UPDATE notes
        SET title = ?, content = ?
        WHERE id = ?
    `, [newTitle, newContent, id]) as any;

    return await getNote(id);
}

export async function deleteNote(
    id: number
) {
    await connection.query(`
        DELETE FROM notes
        WHERE id = ?
    `, [id]);
}