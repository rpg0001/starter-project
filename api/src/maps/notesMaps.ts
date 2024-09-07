import { Note } from "../models/notesModels";
import { JsonApiObjectResponse } from "../utils/successResponses";

export function mapNoteToJsonApiObjectResponse(
    note: Note
): JsonApiObjectResponse {
    return {
        id: note.id,
        type: 'notes',
        attributes: {
            title: note.title,
            content: note.content
        }
    }
}