import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Password@1',
    database: 'notes_app'
}).promise();

export async function getNote(id: number) {
    const result = await pool.query(`
        SELECT * FROM notes WHERE id = ?`
    , [id]);
    const rows = result[0] as any[];
    return rows[0];
}

export async function listNotes() {
    const [rows] = await pool.query(`
        SELECT * FROM notes
    `);
    return rows;
}

export async function createNote(title: string, content: string) {
    const [result] = await pool.query(`
        INSERT INTO notes (title, content)
        VALUES (?, ?)
    `, [ title, content ]) as any;

    const id = result.insertId;
    return getNote(id);
}