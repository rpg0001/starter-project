import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Password@1',
    database: 'notes_app'
}).promise();

export async function getNote(id: string) {
    const note_id = Number(id);
    const result = await pool.query(`
        SELECT * FROM notes WHERE id = ?`
    , [note_id]);
    const rows = result[0] as any[];
    return rows[0];
}

export async function listNotes() {
    const [rows] = await pool.query(`
        SELECT * FROM notes
    `);
    return rows;
}