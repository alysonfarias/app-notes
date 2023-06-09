import { useState } from "react";

const AddNote = ({ handleAddCard }) => {
    const [cardText, setCardText] = useState('');
    const [cardTitle, setCardTitle] = useState('');
    const [cardAuthor, setCardAuthor] = useState('');
    const [isVisible, setVisible] = useState(true);
    const titleCharLimit = 30;
    const descriptionCharLimit = 200;
    const authrCharLimit = 30;

    const handleChangeTitle = (event) => {
        if (titleCharLimit - event.target.value.length >= 0) {
            setCardTitle(event.target.value);
        }
    };


    const handleChangeDescription = (event) => {
        if (descriptionCharLimit - event.target.value.length >= 0) {
            setCardText(event.target.value);
        }
    };

    const handleChangeAuthor = (event) => {
        if (authrCharLimit - event.target.value.length >= 0) {
            setCardAuthor(event.target.value);
        }
    };

    const handleSaveClick = (event) => {
        if (cardText.trim().length > 0) {
            const newCard = {
                title: cardTitle,
                description: cardText,
                author: cardText,
                isVisible: isVisible,
            };
            handleAddCard(newCard);

            setCardTitle('');
            setCardText('');
            setCardAuthor('');
        }
    };

    const handleClearClick = (event) => {
        setCardText('');
    };

    return (
        <div className="note new ">
            {/* <input id="small-input" placeholder="card title" onChange={handleChangeTitle} value={cardTitle}></input> */}
            <textarea
                placeholder="Card title..."
                onChange={handleChangeTitle}
                value={cardTitle}
            ></textarea>
            <textarea
                rows="8"
                cols="10"
                placeholder="Card description..."
                onChange={handleChangeDescription}
                value={cardText}
            ></textarea>
            <small>{descriptionCharLimit - cardText.length} Description remaining</small>
            {/* <textarea
                placeholder="Author..."
                onChange={handleChangeAuthor}
                value={cardAuthor}
            ></textarea> */}
            <div className="card-footer">
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
