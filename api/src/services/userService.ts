import bcrypt from 'bcryptjs';
import * as UserSessionService from "./userSessionService";
import { InternalServerError, NotFoundError } from '../utils/errors';
import { User, UserType } from '../models';
import { logger } from '../utils/logger';

export async function getUser(
    id: number
): Promise<User | null> {
    try {
        return await User.findOne({
            where: {
                id: id
            }
        })
    } catch(error: any) {
        const message = `getUser error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function listUsers(): Promise<User[]>  {
    try {
        return await User.findAll();
    } catch(error: any) {
        const message = `listUsers error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function searchUsers(username: string, email: string): Promise<User[]>  {
    try {
        logger.debug(`Searching for user with email: ${email} and username ${username}`);
        return await User.findAll({
            where: {
                email: email,
                username: username
            }
        })
    } catch(error: any) {
        const message = `searchUsers error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function searchUsersByEmail(email: string): Promise<User[]>  {
    try {
        logger.debug(`Searching for user with email: ${email}`);
        const result = await User.findAll({
            where: {
                email: email
            }
        })
        logger.debug(`User search result: ${JSON.stringify(result)}`);
        return result;
    } catch(error: any) {
        const message = `searchUsersByEmail error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function createUser(
    email: string, 
    username: string,
    password: string,
    userType: UserType
): Promise<User>  {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email: email,
            username: username,
            passwordHash: passwordHash,
            userType: userType
        })
        
        return newUser;
    } catch(error: any) {
        const message = `createUser error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function updateUser(
    id: number, 
    email: string, 
    username: string
): Promise<User>  {
    try {
        const user = await getUser(id);
        if (!user) throw new NotFoundError(`Could not find user with id ${id}`);

        const newEmail = email ?? user.email;
        const newUsername = username ?? user.username;

        await User.update({
            email: newEmail,
            username: newUsername
        },
        {
            where: {
                id: id
            }
        })

        const updatedUser = await getUser(id);
        if (!updatedUser) throw new Error("Failed to retrieve newly updated user with id " + id);

        return updatedUser;
    } catch(error: any) {
        const message = `updateUser error: ${error.message}`;
        throw new InternalServerError(message);
    }
}

export async function deleteUser(
    id: number
) {
    try {
        const user = await getUser(id);
        if (!user) throw new NotFoundError(`No user found with id ${id}`);

        // Delete any user sessions first
        await UserSessionService.deleteUserSessions(id);

        // Then delete user
        await User.destroy({
            where: {
                id: id
            }
        })
    } catch(error: any) {
        const message = `deleteUser error: ${error.message}`;
        throw new InternalServerError(message);
    }
}