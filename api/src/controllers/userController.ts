
import { BadRequestError, NotFoundError } from '../utils/errors';
import * as UserService from '../services/userService';

export async function getUser(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');

        const user = await UserService.getUser(req.params.id);
        if (!user) throw new NotFoundError(`Could not find user with id ${id}`);
        res.status(200).json(user);
    } catch (error: any) {
        next(error);
    }
}

export async function listUsers(req: any, res: any, next: any) {
    try {
        const users = await UserService.listUsers();
        return res.status(200).json(users);
    } catch (error: any) {
        next(error);
    }
}

export async function createUser(req: any, res: any, next: any) {
    try {
        const email = req.body?.email;
        const username = req.body?.username;

        if (!email) throw new BadRequestError('/body/email', 'missing required field');
        if (!username) throw new BadRequestError('/body/username', 'missing required field');
        if (username.length > 23) throw new BadRequestError('/body/username', 'username must be 23 characters or less');
        if (email.length > 255) throw new BadRequestError('/body/email', 'email must be 255 characters or less');
        if (!email.includes("@")) throw new BadRequestError('/body/email', 'email must contain "@"'); // TODO regexes

        const user = await UserService.createUser(email, username);

        return res.status(201).json(user);
    } catch (error: any) {
        next(error);
    }
}

export async function updateUser(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);
        const email = req.body?.email;
        const username = req.body?.username;

        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');
        if (!email && !username) throw new BadRequestError('/body', 'missing required field: email, username');
        if (username && username.length > 23) throw new BadRequestError('/body/username', 'username must be 23 characters or less');
        if (email && email.length > 255) throw new BadRequestError('/body/email', 'email must be 255 characters or less');
        if (email && !email.includes("@")) throw new BadRequestError('/body/email', 'email must contain "@"');

        const user = await UserService.updateUser(id, email, username);
        return res.status(200).json(user);
    } catch (error: any) {
        next(error);
    }
}

export async function deleteUser(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');

        await UserService.deleteUser(req.params.id);
        return res.status(204).json();
    } catch (error: any) {
        next(error);
    }
}