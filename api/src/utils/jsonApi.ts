export class JsonApiResource {
    id: string;
    type: string;
    attributes: any;
    relationships?: any;

    constructor(
        id: string, 
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

export class JsonApiResourceList {
    data: JsonApiResource[];

    constructor(items: JsonApiResource[]) {
        this.data = items;
    }
}

export class JsonApiRelationship {
    data: JsonApiResourceIdentifier;

    constructor(id: string, type: string) {
        this.data = new JsonApiResourceIdentifier(id, type);
    }
}

export class JsonApiResourceIdentifier {
    id: string;
    type: string;

    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
    }
}