import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
const Note = ({
  id,
  title,
  description,
  author,
  created,
  updated,
  votes, // New prop for votes
  handleRemoveNote,
  handleEditNote,
  handleUpvote,
  handleDownvote,
  isAdmin, // New prop for admin status
}) => {
  const formattedCreated = new Date(created).toLocaleString();
  const formattedUpdated = new Date(updated).toLocaleString();
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);


  const [cardText, setCardText] = useState(description);
  const [cardTitle, setCardTitle] = useState(title);
  const [cardAuthor, setCardAuthor] = useState('');

  const titleCharLimit = 30;
  const descriptionCharLimit = 200;
  const authrCharLimit = 30;

  const handleChangeTitle = (event) => {
    if (titleCharLimit - event.target.value.length >= 0) {
        setCardTitle(event.target.value);
        setUpdatedTitle(event.target.value);
    }
  };


  const handleChangeDescription = (event) => {
      if (descriptionCharLimit - event.target.value.length >= 0) {
          setCardText(event.target.value);
          setUpdatedDescription(event.target.value);
      }
  };

  const handleChangeAuthor = (event) => {
      if (authrCharLimit - event.target.value.length >= 0) {
          setCardAuthor(event.target.value);
      }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  };

  const handleSaveClick = () => {
    const updatedNote = {
      id,
      title: updatedTitle,
      description: updatedDescription,
      author,
      created,
      updated,
      votes,
    };

    handleEditNote(id, updatedNote);
    setEditing(false);
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setUpdatedDescription(e.target.value);
  };

  const handleUpvoteClick = () => {
    handleUpvote(id);
  };

  const handleDownvoteClick = () => {
    handleDownvote(id);
  };

  return (
    <div className="note note-edit">
      {!editing ? (
        <>
          <div className="note-container">
            <h5>{title}</h5>
            <div className="vote-badge">
              <button className="vote-button upvote" onClick={handleUpvoteClick}>
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              <button className="vote-button downvote" onClick={handleDownvoteClick}>
                <FontAwesomeIcon icon={faThumbsDown} />
                
              </button>
              <span className="vote-count">{votes}</span>
            </div>
          </div>
          <span>{description}</span>

        </>
      ) : (
        <>
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
        </>
      )}
      <div className="note-footer">
        {/* <small size="0.2em">Created: {formattedCreated}</small> */}
        <small size="0.2em">Last Updated: {formattedUpdated}</small>
        
        {!editing && isAdmin ? (
          <button className="btn" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        ) : (  isAdmin &&
          <div className="button-container">
            <button className="btn" onClick={handleSaveClick}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
            <button className="btn" onClick={handleCancelClick}>
              <FontAwesomeIcon icon={faBan} />
            </button>
          </div>
        )}
        {
          isAdmin && (
            <button onClick={() => handleRemoveNote(id)} className="delete-icon btn" size="1.3em">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          )
        }

      </div>
    </div>
  );
};

export default Note;
