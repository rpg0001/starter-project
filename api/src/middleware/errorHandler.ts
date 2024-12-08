import { config } from "../utils/config";
import { BadRequestError, BaseError, ErrorResponse, InternalServerError, NotFoundError } from "../utils/errors";
import { logger } from "../utils/logger";

function errorHandler(
    err: any, 
    req: any, 
    res: any, 
    next: any
) {
    try {
        
        logger.error(config.NODE_ENV === 'development' ? err.stack : `Error: ${err.message}`);
    
        const baseError: BaseError = err instanceof BaseError
            ? err
            : new InternalServerError();
    
        return res
            .status(baseError.status)
            .json(new ErrorResponse(baseError));
    } catch (error: any) {
        console.error("Error handling error: " + error.message);
        const baseError = new InternalServerError();
        return res
            .status(500)
            .json(new ErrorResponse(baseError));
    }
}

module.exports = errorHandler;