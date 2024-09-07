import { Note } from "../models/notesModel";
import { JsonApiObject } from "./jsonApiMaps";

export function mapNoteToJsonApiObjectResponse(
    note: Note
): JsonApiObject {
    return {
        id: note.id,
        type: 'notes',
        attributes: {
            title: note.title,
            content: note.content
        }
    }
}