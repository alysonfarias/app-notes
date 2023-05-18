import { useState } from "react";

const AddNote = ({ handleAddCard }) => {
    const [cardText, setCardText] = useState('');
    const charLimit = 200;

    const handleChange = (event) => {
        if (charLimit - event.target.value.length >= 0) {
            setCardText(event.target.value);
        }
    };

    const handleSaveClick = (event) => {
        if (cardText.trim().length > 0) {
            const newCard = {
                text: cardText,
            };
            handleAddCard(newCard);
            setCardText('');
        }
    };

    const handleClearClick = (event) => {
        setCardText('');
    };

    return (
        <div className="note new">
            <textarea
                rows="8"
                cols="10"
                placeholder="Type to add a card..."
                onChange={handleChange}
                value={cardText}
            ></textarea>
            <div className="card-footer">
                <small>{charLimit - cardText.length} Remaining</small>
                <div className="options">
                    <button className="btn clear" onClick={handleClearClick}>
                        Clear
                    </button>
                    <button className="btn" onClick={handleSaveClick}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNote;
