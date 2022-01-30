import { useState } from "react";

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const charLimit = 200;
    const handleChange = (event) => {
        if(charLimit - event.target.value.length >= 0){
            setNoteText(event.target.value);
        }
    }


    const handleSaveClick = (event) => {
        if(noteText.trim().length > 0){
            handleAddNote(noteText);
            setNoteText('')
        }
    }
    const handleClearClick = (event) => {
            setNoteText('')
    }



    return(
        <div className="note new">
            <textarea 
            rows="8"
            cols="10"
            placeholder="Type to add a note..."
            onChange={handleChange}
            value={noteText}
           >
            </textarea>
            <div className="note-footer">
                <small>{charLimit - noteText.length} Remaining</small>
                <div className="options">
                    <button className="btn clear"  onClick={handleClearClick}>
                        Clear
                    </button>    
                    <button className="btn"  onClick={handleSaveClick}>
                        Save
                    </button>               

                </div>

            </div>    
        </div>
    )
}

export default AddNote;