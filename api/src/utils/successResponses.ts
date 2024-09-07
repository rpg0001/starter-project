export interface JsonApiObjectResponse {
    id: string | number;
    type: string;
    attributes: any;
    relationships?: any;
}

export interface JsonApiObjectListResponse {
    data: JsonApiObjectResponse[];
}

export function mapToJsonApiListResponse(
    items: JsonApiObjectResponse[]
): JsonApiObjectListResponse {
    return {
        data: items
    }
}

export function mapToJsonApiObjectResponse(
    id: string | number,
    type: string,
    attributes?: any,
    relationships?: any
): JsonApiObjectResponse {
    return {
        id: id,
        type: type,
        attributes: attributes,
        relationships: relationships
    }
}