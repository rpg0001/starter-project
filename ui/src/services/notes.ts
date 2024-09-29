import axios from "axios";

export interface Note {
    id: number;
    attributes: {
        title: string;
        content: string;
    }
}

const baseUrl = "http://localhost:8080";

export async function getNote(
    id: number
): Promise<Note> {
    const response = await axios.get(`${baseUrl}/notes/${id}`);
    return response.data as Note;
}

export async function listNotes(): Promise<Note[]> {
    const response = await axios.get(`${baseUrl}/notes`);
    return response.data.data as Note[];
}

export async function createNote(
    title: string, 
    content: string
): Promise<Note> {
    const requestBody = {
        title: title,
        content: content
    }
    const response = await axios.post(`${baseUrl}/notes`, requestBody);
    return response.data as Note;
}

export async function updateNote(
    id: number,
    title: string, 
    content: string
): Promise<Note> {
    const requestBody = {
        title: title,
        content: content
    }
    const response = await axios.patch(`${baseUrl}/notes/${id}`, requestBody);
    return response.data as Note;
}

export async function deleteNote(id: number) {
    const response = await axios.delete(`${baseUrl}/notes/${id}`);
    return response.data;
}