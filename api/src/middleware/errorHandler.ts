import { config } from "../utils/config";
import { BaseError, InternalServerError, JsonApiErrorResponse } from "../utils/errors";
import { logger } from "../utils/logger";

function errorHandler(
    err: any, 
    req: any, 
    res: any, 
    next: any
) {
    logger.error(config.NODE_ENV === 'development' ? err.stack : `Error: ${err.message}`);

    const baseError: BaseError = err instanceof BaseError
        ? err
        : new InternalServerError();

    return res
        .status(baseError.status)
        .json(new JsonApiErrorResponse([baseError]));
}

module.exports = errorHandler;