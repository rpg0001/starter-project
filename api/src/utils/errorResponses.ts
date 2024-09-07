import { JsonApiError, JsonApiErrorResponse } from "../models/errorsModels";

function getJsonApiErrorResponse(
    errors: JsonApiError[]
): JsonApiErrorResponse {
    return {
        errors: errors
    }
}

export function getInternalServerError(): JsonApiErrorResponse {
    const error: JsonApiError = {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        meta: {
            timestamp: new Date().toISOString()
        }
    }
    return getJsonApiErrorResponse([error]);
}

export function getBadRequestError(
    pointer?: string, 
    parameter?: string,
    header?: string
): JsonApiErrorResponse {
    const error: JsonApiError = {
        status: 400,
        code: 'BAD_REQUEST',
        source: {
            pointer: pointer,
            parameter: parameter,
            header: header
        },
        meta: {
            timestamp: new Date().toISOString()
        }
    }
    return getJsonApiErrorResponse([error]);
}

export function getNotFoundError() {
    const error: JsonApiError = {
        status: 404,
        code: 'NOT_FOUND',
        meta: {
            timestamp: new Date().toISOString()
        }
    }
    return getJsonApiErrorResponse([error]);
}