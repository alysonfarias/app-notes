import { MdDeleteForever } from 'react-icons/md';

const Note = ({id, text, date, handleRemoveNote}) => {

    return (
        <div className="note">
            <span>{text}</span>
            <div className="note-footer">
                <small>{date}</small>
                <MdDeleteForever
                 onClick={() => handleRemoveNote(id)} className='delete-icon' size='1.3em'/>
            </div>
        </div>
    )
}

export default Note;