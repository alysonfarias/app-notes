import React from 'react';
// import { BsLightbulb, BsLightbulbOff } from 'react-icons/bs';


const Header = ({handleToggleDarkMode, darkMode}) => {
    return(
        <div className='header'>
            <h1>NotNote</h1>
            <a href='https://github.com/alysonfarias' class="easter-egg">You found this, but don't click here :D</a>
            {darkMode && <div visibility={true} class="btn" onClick={()=> 
                handleToggleDarkMode(
                    (previusDarkMode)=> !previusDarkMode )
                }/> }
            {!darkMode &&<div class="btn" onClick={()=> 
                handleToggleDarkMode(
                    (previusDarkMode)=> !previusDarkMode )
                }/>}
        </div>
    )
}

export default Header;