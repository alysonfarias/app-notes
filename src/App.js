import { useEffect, useState } from "react";
import NotesList from "./components/NotestList";
import Search from "./components/Search";
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7107/cards");
        console.log("🚀 ~ file: App.js:15 ~ fetchData ~ response:", response)
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error("Failed to fetch data:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, []);

  const addNote = async (text) => {
    const newNote = {
      title: text,
      description: "",
      author: "",
      isVisible: true,
    };

    try {
      const response = await fetch("https://localhost:7107/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const createdNote = await response.json();
        setNotes([...notes, createdNote]);
      } else {
        console.error("Failed to add note:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const removeNote = async (id) => {
    try {
      const response = await fetch(`https://localhost:7107/card/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      } else {
        console.error("Failed to delete note:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("dark-modeOption"));
    if (savedDarkMode) {
      setDarkMode(savedDarkMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dark-modeOption", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} darkMode={darkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) => note.title.toLowerCase().includes(searchText))}
          handleAddCard={addNote}
          handleRemoveNote={removeNote}
        />
      </div>
    </div>
  );
};

export default App;