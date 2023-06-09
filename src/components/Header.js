import React from 'react';
import LoginForm from './LoginForm';

const Header = ({ handleToggleDarkMode, darkMode }) => {
  return (
    <div className='header'>
      <h1>NotNote</h1>
      <a href='https://github.com/alysonfarias' className="easter-egg">You found this, but don't click here :D</a>

      {/* {darkMode && <LoginForm />}  */}
      {darkMode && (
        <div visibility={true} className="btn" onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        } />
      )}

      {!darkMode && (
        <div className="btn" onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        } />
      )}

    </div>
  );
};

export default Header;
