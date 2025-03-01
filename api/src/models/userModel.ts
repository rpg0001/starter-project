export class User {
    id: number;
    email: string;
    username: string;
    passwordHash: string;

    constructor(id: number, email: string, username: string, passwordHash: string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.passwordHash = passwordHash;
    }
}