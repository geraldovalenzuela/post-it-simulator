import React, {Fragment, useRef, useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid';
import { NoteItem } from './NoteItem';

const KEY = "noteList-notes";

export function NotesList() {

    const [notes, setNotes] = useState([]);

    const titleRef = useRef();
    const textRef = useRef();
    const importantRef = useRef();

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem(KEY));
        if (storedNotes) {
            setNotes(storedNotes);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(notes))
    }, [notes])

    const addNote = () => {
        const title = titleRef.current.value;
        const text = textRef.current.value;
        const important = importantRef.current.checked;

        if (text !== '') {
            setNotes((prevNotes) => {
                var classStyle = "normalColor";    
                if (important) {
                    classStyle = "importantColor";
                }
                const newNote = {
                    id: uuid(),
                    title: title,
                    text: text,
                    classStyle: classStyle
                }
                return [...prevNotes, newNote]
            })
        }
        titleRef.current.value = null;
        textRef.current.value = null;
        importantRef.current.checked = false;
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    }

    return(
        <Fragment>
            <h1>Post It Simulator!</h1>
            
            <form className="row align-items-center mt-4 mb-4">
                <div className="col-4">
                    <input ref={titleRef} type="text" className="form-control" placeholder="Título"/>
                </div>

                <div className="col-4">
                    <input ref={textRef} type="text" className="form-control" placeholder="Texto" required/>
                </div>

                <div className="col-2">
                    <div className="form-check">
                        <input ref={importantRef} className="form-check-input" type="checkbox"/>
                        <label className="form-check-label text-light">
                            ¡Importante!
                        </label>
                    </div>
                </div>

                <div className="col-2">
                    <button onClick={addNote} className="btn btn-dark">Agregar</button>
                </div>
            </form>
            <ul>
                {notes.map((note) => (
                    <NoteItem note={note} key={note.id} deleteNote={deleteNote}></NoteItem>
                ))}
            </ul>
        </Fragment>
    );
}