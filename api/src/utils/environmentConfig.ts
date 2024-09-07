import { environment } from "../environment";

export type EnvironmentVariable = {
    name: string;
    type: 'string' | 'number'
}

export function validateEnvironment(): string[] {
    const errorMessages: string[] = [];
    environment.forEach(v => {
        const value = process.env[v.name];
        
        if (!value) {
            errorMessages.push(`${v.name} is missing`);
        }

        if (v.type === "string" && typeof value !== typeof "") {
            errorMessages.push(`${v.name} is not a string`);
        }

        if (v.type === "number" && typeof Number(value) !== typeof 1) {
            errorMessages.push(`${v.name} is not a number`);
        }
    })
    return errorMessages;
}