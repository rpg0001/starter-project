import { JsonApiObjectListResponse, JsonApiObjectResponse } from "../utils/successResponses"

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