import React from 'react';
import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({
  notes,
  handleAddCard,
  handleRemoveNote,
  handleEditNote,
  handleUpvote,
  handleDownvote,
  isAdmin, // New prop to indicate admin status
}) => {
  // Sort notes based on vote count in descending order
  const sortedNotes = [...notes].sort((a, b) => b.votes - a.votes);

  return (
    <div className="notes-list">
      {sortedNotes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          description={note.description}
          author={note.author}
          created={note.created}
          updated={note.updated}
          votes={note.votes}
          handleRemoveNote={handleRemoveNote}
          handleEditNote={handleEditNote}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          isAdmin={isAdmin} // Pass the isAdmin prop to NoteItem component
        />
      ))}
      <AddNote handleAddCard={handleAddCard} />
    </div>
  );
};

export default NotesList;