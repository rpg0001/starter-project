import { BaseError, InternalServerError, JsonApiErrorResponse } from "../utils/errors";

function errorHandler(
    err: any, 
    req: any, 
    res: any, 
    next: any
) {
    console.error(process.env.NODE_ENV === 'development' ? err.stack : `Error: ${err.message}`);

    const baseError: BaseError = err instanceof BaseError
        ? err
        : new InternalServerError();

    return res.status(baseError.status).json(new JsonApiErrorResponse([baseError]));
}

module.exports = errorHandler;