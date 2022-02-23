import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux-hook'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { 
    createNote,
    updateNote,
    deleteNote,
    retrieveNotes
       } from '../actions/notes'


const Notepage = ({match, history}) => {
    let noteId = match.params.id
   
    const intialNoteState = {
            id: null,
            body: ""
        };
    const [note, setNote] = useState(intialNoteState);
    const setSubmitted = useState(false);
    const currentNote = useState(null);
    const setMessage = useState("");
    const dispatch = useDispatch();
 

    useEffect(() => {
      
        getNote()

    }, [noteId])


    let getNote = async () => {
        if(noteId === 'new') return

       dispatch(retrieveNotes());
    }
    

    const saveNote = () => {
        const {body} = note;
        dispatch(createNote(body))
            .then(data => {
                setNote({
                    id: data.id,
                    body: data.body
                });
                setSubmitted(true);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateContent = () => {
        dispatch(updateNote(currentNote.id, currentNote))
            .then(response => {
                console.log(response);
                setMessage("The note was updated succcessfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };
    


    const removeNote = () => {
        dispatch(deleteNote(currentNote.id))
            .then((props) => {
                props.history.push("/notes")
            })
            .catch(e => {
                console.log(e);
            });
    };


    let handleSubmit = () => {
        if(noteId !== 'new' && !note.body) {
            removeNote()  
        } else if(noteId !== 'new') {
            updateContent()
        } else if(noteId === 'new' && note !==null) {
            saveNote()
        }
        
        history.push('/')
    }

    return(
        <div className="note">
            
            <div className="note-header">
                <h3>
                <Link to="/">
                    <ArrowLeft  onClick={handleSubmit} />
                </Link>
                </h3>
                {noteId !== 'new' ? (
                     <button onClick={removeNote}>Delete</button>
                ):(
                    <button onClick={handleSubmit}>Done</button>
                )}
               
            </div>

            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>

        </div>
    )
}

export default Notepage