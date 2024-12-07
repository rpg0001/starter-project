import { config } from "../utils/config";
import { BadRequestError, BaseError, InternalServerError, JsonApiErrorResponse } from "../utils/errors";
import { logger } from "../utils/logger";

function errorHandler(
    err: any, 
    req: any, 
    res: any, 
    next: any
) {
    try {
        if (err instanceof BadRequestError) {
            logger.warn(`Bad request: ${err.message}`);
        } else { 
            logger.error(config.NODE_ENV === 'development' ? err.stack : `Error: ${err.message}`);
        }
    
        const baseError: BaseError = err instanceof BaseError
            ? err
            : new InternalServerError();
    
        return res
            .status(baseError.status)
            .json(new JsonApiErrorResponse([baseError]));
    } catch (error: any) {
        console.error("Error handling error: " + error.message);
        const baseError = new InternalServerError();
        return res
            .status(500)
            .json(new JsonApiErrorResponse([baseError]));
    }
}

module.exports = errorHandler;