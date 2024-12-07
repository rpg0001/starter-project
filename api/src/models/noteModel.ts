import { JsonApiRelationship, JsonApiResource } from "../utils/jsonApi";

export class Note {
    id: number;
    title: string;
    content: string;
    userId: number;

    constructor(id: number, title: string, content: string, userId: number) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }

    getJsonApiResponse(includeRelationships?: boolean) {
        const userRelationship = includeRelationships ? new JsonApiRelationship(String(this.userId), 'users') : undefined;
        return new JsonApiResource(
            String(this.id), 
            'notes', 
            {
                title: this.title,
                content: this.content
            },
            userRelationship
        );
    }
}