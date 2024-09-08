import './Notes.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Note } from "./NoteModels";
import { listNotes } from "./NoteService";

export default function NoteList() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => setNotes(await listNotes());
        fetchNotes();
    }, [])
    
    return (
        <div>
            <h1>All notes</h1>
            <Link to='create'>Add new note</Link>
            <div className='note-list'>
                {notes.map(note => 
                    <div className='note'>
                        <h3>{note.attributes.title}</h3>
                        <p>{note.attributes.content}</p>
                        <Link to={`${note.id}`} >view note</Link>
                    </div>
                )}
            </div>
        </div>
    )
}