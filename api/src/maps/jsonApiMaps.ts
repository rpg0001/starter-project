export type JsonApiObject = {
    id: string | number;
    type: string;
    attributes: any;
    relationships?: any;
}

export function mapToJsonApiListResponse(
    items: JsonApiObject[]
) {
    return {
        data: items
    }
}

export function mapToJsonApiObjectResponse(
    id: string | number,
    type: string,
    attributes?: any,
    relationships?: any
): JsonApiObject {
    return {
        id: id,
        type: type,
        attributes: attributes,
        relationships: relationships
    }
}