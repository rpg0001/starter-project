/* 
    List of required environment variables
    Add these to your .env file and make sure to add any new ones here
    To view stack traces, set NODE_ENV to development
*/

import { logger } from "./logger";

export const environment: EnvironmentVariable[] = [
    { name: 'DB_HOST', type: 'string' },
    { name: 'DB_USER', type: 'string' },
    { name: 'DB_PASSWORD', type: 'string' },
    { name: 'DB_NAME', type: 'string' },
    { name: 'NODE_ENV', type: 'string' },
    { name: 'LOG_LEVEL', type: 'string' },
]

type EnvironmentVariable = {
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
    
    if (errorMessages.length > 0) {
        logger.error(`Configuration error(s): ${errorMessages.join(', ')}`);
    }

    return errorMessages;
}