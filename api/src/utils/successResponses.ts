export interface JsonApiObjectResponse {
    id: string | number;
    type: string;
    attributes: any;
    relationships?: any;
}

export interface JsonApiObjectListResponse {
    data: JsonApiObjectResponse[];
}