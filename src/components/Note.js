const Note = ({ id, title, description, date, created, handleRemoveNote }) => {
  return (
    <div className="note">
      <h5>{title}</h5>
      <span>{description}</span>
      <div className="note-footer">
        <small>Created: {created}</small>
        <small>Last Updated: {date}</small>
        <h6 onClick={() => handleRemoveNote(id)} className="delete-icon" size="1.3em">
          X
        </h6>
      </div>
    </div>
  );
};

export default Note;
