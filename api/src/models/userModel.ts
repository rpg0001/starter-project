import { JsonApiObjectResponse } from "../utils/successResponses";

export class User {
    id: number;
    email: string;
    username: string;

    constructor(id: number, email: string, username: string) {
        this.id = id;
        this.email = email;
        this.username = username;
    }

    getJsonApiResponse() {
        return new JsonApiObjectResponse(
            this.id, 
            'users', 
            {
                email: this.email,
                username: this.username
            }
        );
    }
}