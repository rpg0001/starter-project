import { useEffect, useState } from "react";
import { Note } from "./noteModels";
import { listNotes } from "./noteService";
import { Link } from "react-router-dom";

export default function NoteList() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => setNotes(await listNotes());
        fetchNotes();
    }, [])
    
    return (
        <div>
            <h2>All notes:</h2>
            {notes.map(note => 
                <>
                    <div>
                        <h3>{note.attributes.title}</h3>
                        <p>{note.attributes.content}</p>
                        <Link to={`${note.id}`} >view note</Link>
                    </div>
                </>
            )}
        </div>
    )
}