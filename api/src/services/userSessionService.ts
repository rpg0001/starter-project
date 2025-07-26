import { randomBytes } from "crypto";
import { logger } from "../utils/logger";
import { UserSession } from "../models";
import { InternalServerError } from "../utils/errors";

export async function getUserSession(
    token: string
): Promise<UserSession | null> {
    try {
        return await UserSession.findOne({
            where: {
                token: token
            },
            attributes: [
                "id",
                "token",
                "userId",
                "expiresAt",
                "createdAt",
            ]
        })
    } catch (error: any) {
        const message = `getUserSession error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function getUserSessionById(
    id: number
): Promise<UserSession | null> {
    try {
        return await UserSession.findOne({
            where: {
                id: id
            }
        })
    } catch (error: any) {
        const message = `getUserSessionById error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function createUserSession(
    userId: number
): Promise<UserSession>  {
    try {
        const token = randomBytes(32).toString('hex');
        const expiresAtDate = new Date();
        expiresAtDate.setDate(expiresAtDate.getDate() + 30);
        const expiresAt = expiresAtDate.toISOString().split(".")[0];

        const newUserSession = await UserSession.create({
            token: token,
            expiresAt: expiresAt,
            userId: userId
        })
        
        return newUserSession;
    } catch (error: any) {
        const message = `createUserSession error: ${error.message}`;
        throw new InternalServerError(message);
    }
}


export async function deleteUserSession(
    token: string
) {
    try {
        const userSession = await getUserSession(token);

        if (!userSession) {
            logger.info("deleteUserSession - session has already been deleted");
            return;
        }

        await UserSession.destroy({
            where: {
                token: token
            }
        })
    } catch (error: any) {
        const message = `deleteUserSession error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function deleteUserSessions(
    userId: number
) {
    try {
        const userSessions = await UserSession.findAll({
            where: {
                userId: userId
            }
        })

        for (const session of userSessions) {
            await deleteUserSession(session.token);
        }
    } catch (error: any) {
        const message = `deleteUserSessions error: ${error.message}`;
        throw new InternalServerError(message);
    }
}