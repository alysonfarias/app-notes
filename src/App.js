import { useEffect, useState } from "react";
import NotesList from "./components/NotestList";
import Search from "./components/Search";
import Header from './components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import LoginForm from './components/LoginForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setAdmin] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkAdminRole = () => {
    const storedRole = localStorage.getItem('role');
    const isAdminRole = storedRole === 'adminPassword';
    console.log("🚀 ~ file: App.js:18 ~ checkAdminRole ~ isAdminRole:", isAdminRole)
    setAdmin(isAdminRole);
  };

  useEffect(() => {
    checkAdminRole();
    const fetchData = async () => {
      try {
        // const response = await fetch("https://projetoredes.azurewebsites.net//cards");
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    const handleRoleChange = () => {
      checkAdminRole();
      // Additional code or function calls when the role changes can be added here
    };

    // Listen for changes in localStorage's 'role' item
    window.addEventListener("storage", handleRoleChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleRoleChange);
    };
  }, []);


  const addNote = async (text) => {
    const newNote = text;

    try {
      // const response = await fetch("https://projetoredes.azurewebsites.net/card", {
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
      // const response = await fetch(`https://projetoredes.azurewebsites.net/card/${id}`, {
      const response = await fetch(`https://localhost:7107/card/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
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

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:7107/cards");
      console.log("🚀 ~ file: App.js:76 ~ fetchData ~ response:", response)
      return response.json();
      // ...
    } catch (error) {
      // ...
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      // const response = await fetch(`https://projetoredes.azurewebsites.net/card/${id}`, {
      const response = await fetch(`https://localhost:7107/card/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedNote),
      });
  
      if (response.ok) {
        let newData = await fetchData();
        setNotes(newData);
      } else {
        console.error("Failed to update note:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleUpvote = async (id) => {
    try {
      // const response = await fetch(`https://projetoredes.azurewebsites.net/card/${id}/upvote`, {
      const response = await fetch(`https://localhost:7107/card/${id}/upvote`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        // Update the vote count in the state
        const updatedNotes = notes.map((note) =>
          note.id === id ? { ...note, votes: note.votes + 1 } : note
        );
        setNotes(updatedNotes);
      } else {
        console.error('Failed to upvote note:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const handleDownvote = async (id) => {
    try {
      // const response = await fetch(`https://projetoredes.azurewebsites.net/card/${id}/downvote`, {
      const response = await fetch(`https://localhost:7107/card/${id}/downvote`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        // Update the vote count in the state
        const updatedNotes = notes.map((note) =>
          note.id === id ? { ...note, votes: note.votes - 1 } : note
        );
        setNotes(updatedNotes);
      } else {
        console.error('Failed to downvote note:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
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


  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7107/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response status:', response.status);
      const token = await response.text();
      console.log('Response content:', token);
      localStorage.setItem('token', token);
      
      if (username === 'admin' && password === 'password') {
        localStorage.setItem('role', 'adminPassword');
      }
      checkAdminRole();

      // ... rest of the code ...
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleAdminClick = () => {
    console.log('Admin button clicked');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAdmin(false);
    checkAdminRole();
  };


 return (
    <div className={`${darkMode && "dark-mode"}`}>
      {darkMode && !isAdmin &&(
          <form onSubmit={handleSubmitLogin} className="dark-form">
          <div>
              <label className="dark-label">Username:</label>
              <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="dark-input"
              />
          </div>
          <div>
              <label className="dark-label">Password:</label>
              <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="dark-input"
              />
          </div>
          <button type="submit" className="dark-button">Login</button>
          </form>
          )}
          {isAdmin && (
          <button onClick={handleAdminClick} className="dark-button">
              Logout
          </button>
          )
      } 

      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} darkMode={darkMode} />
        <Search handleSearchNote={setSearchText} />
        {loading ? (
          <div className="skeleton">
            <span>Loading...  </span>
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
          
        ) : (
          <NotesList
            notes={notes.filter((note) =>
              note.title.toLowerCase().includes(searchText)
            )}
            handleAddCard={addNote}
            handleRemoveNote={removeNote}
            handleEditNote={updateNote}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
};

export default App;