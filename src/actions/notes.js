import {
    CREATE_NOTE,
    RETRIEVE_NOTES,
    UPDATE_NOTE,
    DELETE_NOTE,
    DELETE_ALL_NOTES,
} from "./types"
import noteDataService from '../services/NoteService'

export const createNote = (body) => async (dispatch) => {
    try {
        //its showing an error for this body its saying that its undefined
        //the tutorial is using title and description
        //which are the two values that it is using
        const res = await noteDataService.create(body);
        dispatch({
            type: CREATE_NOTE,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveNotes = () => async (dispatch) => {
    try {
        const res = await noteDataService.getAll();
        dispatch({
            type: RETRIEVE_NOTES,
            payload: res.data,
        });
        return Promise.resolve(res.data)
    } catch (err) {
        console.log(err);
    }
};

export const updateNote = (id, data) => async (dispatch) => {
    try {
        const res = await noteDataService.update(id, data);
        dispatch({
            type: UPDATE_NOTE,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteNote = (id) => async (dispatch) => {
    try {
        await noteDataService.remove(id);
        dispatch({
            type: DELETE_NOTE,
            payload: { id },
        }); 
    } catch (err) {
        console.log(err)
    }
};

export const deleteAllNotes = () => async (dispatch) => {
    try {
        const res = await noteDataService.removeAll();
        dispatch({
            type: DELETE_ALL_NOTES,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

