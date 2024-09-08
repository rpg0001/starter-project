export class JsonApiObjectResponse {
    id: string | number;
    type: string;
    attributes: any;
    relationships?: any;

    constructor(
        id: string | number, 
        type: string,
        attributes: any, 
        relationships?: any
    ) {
        this.id = id;
        this.type = type;
        this.attributes = attributes;
        this.relationships = relationships;
    }
}

export class JsonApiObjectListResponse {
    data: JsonApiObjectResponse[];

    constructor(
        items: JsonApiObjectResponse[]
    ) {
        this.data = items;
    }
}