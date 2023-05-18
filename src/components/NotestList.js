import Note from './Note';
import AddNote from './AddNote';
const NotesList = ({ notes, handleAddCard, handleRemoveNote }) => {
    return(
        <div className="notes-list">
            {notes.map((note) =>
             <Note id={note.id}
             title={note.title}
             description={note.description}
             author={note.author}
             created={note.created}
             updated={note.updated}
             handleRemoveNote={handleRemoveNote}
             />)}
             <AddNote handleAddCard={handleAddCard} />
        </div>
    )
}

export default NotesList;