import React, { useState, useEffect } from "react";
import noteDataService from './services/NoteService'
import { useDispatch, useSelector } from 'react-redux';
import { 
    createNote,
    updateNote,
    deleteNote,
    retrieveNotes,
    deleteAllNotes 
       } from './actions/notes'
import { response } from "express";


const addNote = () => {
    const intialNoteState = {
        id: null,
        body: ""
    };
const [note, setNote] = useState(intialNoteState);
const [currentNote, setCurrentNote] = useState(null);
const [currentIndex, setCurrentIndex] = useState(-1);
const [searchDate, setSearchDate] = useState('');
const notes = useSelector(state => state.notes)
const [submitted, setSubmitted] = useState(false);
const [message, setMessage] = useState("");
const dispatch = useDispatch();
useEffect(() => {
    dispatch(retrieveNotes());
}, []);

const handleInputChange = event => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value});
};

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

const newNote = () => {
    setNote(intialNoteState);
    setSubmitted(false);
};

const onChangeSearchDate = e => {
    const searchDate = e.target.value;
    setSearchDate(searchDate);
};

const refreshData = () => {
    setCurrentNote(null);
    setCurrentIndex(-1);
};

const setActiveNote = (note, index) => {
    setCurrentNote(note);
    setCurrentIndex(index);
};

const removeAllNotes = () => {
    dispatch(deleteAllNotes())
        .then(response => {
            console.log(response);
            refreshData();
        })
        .catch(e => {
            console.log(e);
        });
};

const findByDate = () => {
    refreshData();
    dispatch(findNoteByDate(searchDate));
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
        .then(() => {
            props.history.push("/notes")
        })
        .catch(e => {
            console.log(e);
        });
};
}