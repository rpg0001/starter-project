import { useParams } from "react-router-dom";
import { Note } from "./NoteModels";
import { useEffect, useState } from "react";
import { getNote } from "./NoteService";
import './Notes.css';

export default function NoteDetails() {
    const { id } = useParams();

    const [note, setNote] = useState<Note>();

    useEffect(() => {
        const fetchNote = async () => setNote(await getNote(Number(id)));
        fetchNote();
    }, [id]);
    
    return (
        <div>
            <h1>View note</h1>
            {note ?
                <div className='note'>
                    <h2>{note?.attributes.title}</h2>
                    <p>{note?.attributes.content}</p>
                </div>
            :
                <div>
                    <p>Failed to retrieve note</p>
                </div>
            }
        </div>
    )
}