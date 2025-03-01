import { randomBytes } from "crypto";
import { connection } from "../app";
import { UserSession } from "../models/userSessionModel";
import { NotFoundError } from "../utils/errors";

export async function getUserSession(
    token: string
): Promise<UserSession | null> {
    const result = await connection.query(`
        SELECT * FROM user_sessions WHERE token = ?`
    , [token]);
    const rows = result[0] as any[];
    const userSession = rows[0];
    return userSession ? new UserSession(
        userSession.id, 
        userSession.token, 
        userSession.user_id,
        userSession.expires_at, 
        userSession.created_at
    ) : null;
}

export async function getUserSessionById(
    id: number
): Promise<UserSession | null> {
    const result = await connection.query(`
        SELECT * FROM user_sessions WHERE id = ?`
    , [id]);
    const rows = result[0] as any[];
    const userSession = rows[0];
    return userSession ? new UserSession(
        userSession.id, 
        userSession.token, 
        userSession.user_id,
        userSession.expires_at, 
        userSession.created_at
    ) : null;
}

export async function createUserSession(
    userId: number
): Promise<UserSession>  {
    const token = randomBytes(32).toString('hex');
    const expiresAtDate = new Date();
    expiresAtDate.setDate(expiresAtDate.getDate() + 30);
    const expiresAt = expiresAtDate.toISOString().split(".")[0];
    
    const [newUserSession] = await connection.query(`
        INSERT INTO user_sessions (token, expires_at, user_id)
        VALUES (?, ?, ?)
    `, [ token, expiresAt, userId ]) as any;

    const fullNewUserSession = await getUserSessionById(newUserSession.insertId);
    if (!fullNewUserSession) throw new Error("Failed to retrieve newly created user session with id " + newUserSession.insertId);
    return fullNewUserSession;
}


export async function deleteUserSession(
    token: string
) {
    const userSession = await getUserSession(token);

    if (!userSession) {
        throw new NotFoundError("Could not find user session");
    }

    await connection.query(`
        DELETE FROM user_sessions
        WHERE id = ?
    `, [userSession.id]);
}