import axios from "axios";
import { baseUrl } from "../shared/constants";

export interface User {
    id: number;
    username: string;
    email: string;
}

export async function getUser(
    id: number
): Promise<User> {
    const response = await axios.get(`${baseUrl}/users/${id}`);
    return response.data as User;
}

export async function listUsers(): Promise<User[]> {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data as User[];
}

export async function createUser(
    email: string, 
    username: string
): Promise<User> {
    const requestBody = {
        email: email,
        username: username
    }
    const response = await axios.post(`${baseUrl}/users`, requestBody);
    return response.data as User;
}

export async function updateUser(
    id: number,
    email: string, 
    username: string
): Promise<User> {
    const requestBody = {
        email: email,
        username: username
    }
    const response = await axios.patch(`${baseUrl}/users/${id}`, requestBody);
    return response.data as User;
}

export async function deleteUser(id: number) {
    const response = await axios.delete(`${baseUrl}/users/${id}`);
    return response.data;
}