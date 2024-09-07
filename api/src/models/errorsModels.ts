export interface JsonApiErrorResponse {
    errors: JsonApiError[]
}

export interface JsonApiError {
    status: number;
    code: string;
    source?: {
        pointer?: string;
        parameter?: string;
        header?: string;
    },
    meta: {
        timestamp: string;
    }
}

