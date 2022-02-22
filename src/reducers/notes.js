import { 
    CREATE_NOTE,
    RETRIEVE_NOTES,
    UPDATE_NOTE,
    DELETE_NOTE,
    DELETE_ALL_NOTES,
 } from '../actions/types' 

 const initialState = [];

 function noteReducer(notes = initialState, action) {
     const { type, payload } = action;
     switch (type) {
         case CREATE_NOTE:
             return [...notes, payload];
         case RETRIEVE_NOTES:
             return payload;
         case UPDATE_NOTE:
             return notes.map((note) => {
                 if (note.id === payload.id) {
                     return {
                         ...note,
                         ...payload,
                     };
                 } else {
                     return note;
                 }
             });
         case DELETE_NOTE:
             return notes.filter(({ id }) => id !== payload.id);
         case DELETE_ALL_NOTES:
             return [];
         default:
             return notes;       
     }
 };

 export default noteReducer;