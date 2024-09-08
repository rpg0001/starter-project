import { useEffect, useState } from "react";
import { Note } from "./noteModels";
import { listNotes } from "./noteService";

export default function NoteList() {
    const [notes, setNotes] = useState<Note[]>([]);

    async function getNotesFromApi() {
        const notes = await listNotes();
        setNotes(notes);
    }

    useEffect(() => {
        getNotesFromApi();
    }, [])
    
    return (
        <div>
            <h2>All notes:</h2>
            {notes.map(note => 
                <>
                    <div>
                        <h3>{note.attributes.title}</h3>
                        <p>{note.attributes.content}</p>
                    </div>
                </>
            )}
        </div>
    )
}