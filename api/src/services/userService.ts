import { connection } from "../app";
import { User } from "../models/userModel";
import { NotFoundError } from "../utils/errors";

export async function getUser(
    id: number
): Promise<User | null> {
    const result = await connection.query(`
        SELECT * FROM users WHERE id = ?`
    , [id]);
    const rows = result[0] as any[];
    const user = rows[0];
    return user ? new User(user.id, user.email, user.username) : null;
}

export async function listUsers(): Promise<User[]>  {
    const [users] = await connection.query(`
        SELECT * FROM users
    `);
    return (users as any[]).map(user => new User(user.id, user.email, user.username))
}

export async function createUser(
    email: string, 
    username: string
): Promise<User | null>  {
    const [newUser] = await connection.query(`
        INSERT INTO users (email, username)
        VALUES (?, ?)
    `, [ email, username ]) as any;

    return await getUser(newUser.insertId) ?? null;
}

export async function updateUser(
    id: number, 
    email: string, 
    username: string
): Promise<User | null>  {
    const user = await getUser(id);

    if (!user) throw new NotFoundError(`Could not find user with id ${id}`);

    const newEmail = email ?? user.email;
    const newUsername = username ?? user.username;
    
    const result = await connection.query(`
        UPDATE users
        SET email = ?, username = ?
        WHERE id = ?
    `, [newEmail, newUsername, id]) as any;

    return await getUser(id) ?? null;
}

export async function deleteUser(
    id: number
) {
    await connection.query(`
        DELETE FROM users
        WHERE id = ?
    `, [id]);
}