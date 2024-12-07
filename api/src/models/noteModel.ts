import { JsonApiObjectResponse } from "../utils/successResponses";

export class Note {
    id: number;
    title: string;
    content: string;

    constructor(id: number, title: string, content: string) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    getJsonApiResponse() {
        return new JsonApiObjectResponse(
            this.id, 
            'notes', 
            {
                title: this.title,
                content: this.content
            }
        );
    }
}