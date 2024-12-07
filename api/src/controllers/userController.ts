
import { User } from '../models/userModel';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { JsonApiObjectListResponse } from '../utils/successResponses';
import * as UserService from '../services/userService';

export async function getUser(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) throw new BadRequestError('/id', 'Id must be a number');
        const user = await UserService.getUser(req.params.id);
        if (!user) throw new NotFoundError(`Could not find user with id ${id}`);
        res.status(200).json(user.getJsonApiResponse());
    } catch (error: any) {
        next(error);
    }
}

export async function listUsers(req: any, res: any, next: any) {
    try {
        const users = await UserService.listUsers();
        return res.status(200).json(
            new JsonApiObjectListResponse(
                users.map((user: User) => user.getJsonApiResponse())
            )
        );
    } catch (error: any) {
        next(error);
    }
}

export async function createUser(req: any, res: any, next: any) {
    try {
        const email = req.body?.email;
        const username = req.body?.username;
        if (!email) throw new BadRequestError('/email');
        if (!username) throw new BadRequestError('/username');
        const user = await UserService.createUser(email, username);
        return res.status(201).json(user?.getJsonApiResponse() ?? {});
    } catch (error: any) {
        next(error);
    }
}

export async function updateUser(req: any, res: any, next: any) {
    const id = Number(req.params.id);
    try {
        const email = req.body?.email;
        const username = req.body?.username;
        if (isNaN(id)) throw new BadRequestError('/id');
        if (!email && !username) throw new BadRequestError('/body');
        const user = await UserService.updateUser(id, email, username);
        return res.status(200).json(user?.getJsonApiResponse() ?? {});
    } catch (error: any) {
        next(error);
    }
}

export async function deleteUser(req: any, res: any, next: any) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) throw new BadRequestError('/id');
        await UserService.deleteUser(req.params.id);
        return res.status(204).json();
    } catch (error: any) {
        next(error);
    }
}