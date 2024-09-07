import { EnvironmentVariable } from "./utils/environmentConfig";

// List of required environment variables
// Add these to your .env file and make sure to update it with any new ones
export const environment: EnvironmentVariable[] = [
    { name: 'DB_HOST', type: 'string'},
    { name: 'DB_USER', type: 'string'},
    { name: 'DB_PASSWORD', type: 'string'},
    { name: 'DB_NAME', type: 'string'},
]
