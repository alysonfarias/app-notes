import { useEffect, useState } from "react";
import NotesList from "./components/NotestList";
import { nanoid } from 'nanoid';
import Search from "./components/Search";
import Header from './components/Header';
const App = () => {
  const [notes, setNotes] = useState([{
    id: nanoid(),
    text: "This is my first note!",
    date: "28/01/2022"
  },
  {
    id: nanoid(),
    text: "This is my second note!",
    date: "23/11/2020"
  },
  {
    id: nanoid(),
    text: "This is my third note!",
    date: "21/01/2019"
  }]);
    
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    }
    const newNotes = [ ...notes, newNote];
    setNotes(newNotes);
  }
  const removeNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // reading data from notes and dark-mode options
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
    const darkMode = JSON.parse(localStorage.getItem('dark-modeOption'))
    if(savedNotes){
      setNotes(savedNotes);
    }
    if(darkMode){
      setDarkMode(darkMode)
    }
  }, [])

  // saving notes on localStorage
  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data', JSON.stringify(notes))
  }, [notes])

  // darkModeOption

  useEffect(() => {
    localStorage.setItem(
      'dark-modeOption', JSON.stringify(darkMode))
  }, [darkMode])
    return(
      <div className={`${darkMode && 'dark-mode'}`}>
        <div className="container">
          <Header handleToggleDarkMode={setDarkMode} darkMode={darkMode}/>
          <Search handleSearchNote={setSearchText}/>
          <NotesList notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} 
          handleAddNote={addNote}
          handleRemoveNote={removeNote}
          />
        </div>  
      </div>

  )
}

export default App;