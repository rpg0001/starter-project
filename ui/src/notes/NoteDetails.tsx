import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNote, Note } from "../services/notes";
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
                <>
                    <div className='note'>
                        <h2>{note?.attributes.title}</h2>
                        <p>{note?.attributes.content}</p>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <Link to={`${note.id}/edit`} >edit</Link>
                        |
                        <Link to={`${note.id}/delete`} >delete</Link>
                    </div>
                </>
            :
                <div>
                    <p>Failed to retrieve note</p>
                </div>
            }
        </div>
    )
}