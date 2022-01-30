import Note from './Note';
import AddNote from './AddNote';
const NotesList = ({ notes, handleAddNote, handleRemoveNote }) => {
    return(
        <div className="notes-list">
            {notes.map((note) =>
             <Note id={note.id}
             text={note.text}
             date={note.date}
             handleRemoveNote={handleRemoveNote}
             />)}
             <AddNote handleAddNote={handleAddNote} />
        </div>
    )
}

export default NotesList;