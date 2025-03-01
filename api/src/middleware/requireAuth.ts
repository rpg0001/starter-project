import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/errors';
import * as UserSessionService from "../services/userSessionService";
import { getUser } from '../services/userService';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.session

    if (!token) {
      throw new UnauthorizedError("Authentication required");
    }

    const session = await UserSessionService.getUserSession(token);

    if (!session) {
      res.clearCookie('session');
      throw new UnauthorizedError("Invalid session");
    }

    if (session.expiresAt < new Date()) {
      await UserSessionService.deleteUserSession(session.token);
      res.clearCookie('session');
      throw new UnauthorizedError("Session expired");
    }

    const user = await getUser(session.userId);

    if (!user) {
      throw new Error("Session user not found. User id: " + session.userId);
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    }
    req.session = {
      id: session.id,
      token: session.token,
    }

    next();
  } catch (error) {
    next(error);
  }
}