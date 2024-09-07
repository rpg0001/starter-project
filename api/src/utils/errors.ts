// JSON Api compliant error response
export class JsonApiErrorResponse {
    errors: BaseError[];
    constructor(errors: BaseError[]) {
        this.errors = errors;
    }
}

// JSON Api compliant base error
export class BaseError extends Error {
    status: number;
    code: string;
    meta: {
        timestamp: string;
    };

    constructor(status: number, code: string, message?: string) {
        super(message);
        this.status = status;
        this.code = code;
        this.meta = { timestamp: new Date().toISOString() };
    }
}

export class InternalServerError extends BaseError {
    constructor(message?: string) {
        super(500, 'INTERNAL_SERVER_ERROR', message)
    }
}

export class NotFoundError extends BaseError {
    constructor(message?: string) {
        super(404, 'NOT_FOUND', message)
    }
}

export class BadRequestError extends BaseError {
    source: {
        pointer: string;
    };
    constructor(pointer: string, message?: string) {
        super(400, 'BAD_REQUEST', message)
        this.source = { pointer: pointer };
    }
}