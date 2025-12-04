import React from 'react';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Navegacion = ({ onToggleHistorial }) => {

    //ESTADOS
    const { theme, setTheme } = useContext(ThemeContext)

    //FUNCIONES 
    const handleThemeToggle = (e) => {
        const newTheme = e.target.value
        setTheme(newTheme)
        console.log('cambiando el tema a: ', {newTheme})
    };

    const handleLangChange = (e) => {
        // Lógica para cambiar el idioma
        console.log("Idioma cambiado a:", e.target.value);
    };

    const handleFontSizeChange = (e) => {
        // Lógica para cambiar el tamaño de la fuente
        console.log("Tamaño de fuente cambiado a:", e.target.value);
    };

    const handleLogin = () => {
        // Lógica para mostrar modal de login/registro
        console.log("Abriendo modal de registro/login...");
    };



    return (
        <nav className='nav'>
            <div className='nav-historial'>
                <button onClick={onToggleHistorial}>
                    =
                </button>
            </div>
            <div className='nav-theme'>
                <label >tema: </label>
                <select id="theme-select" onChange={handleThemeToggle} value={theme}>
                    <option value="ligth">claro</option>
                    <option value="dark">oscuro</option>
                </select>
            </div>
            <div>
                <label >Idioma: </label>
                <select id="language-select" onChange={handleLangChange}>
                    <option value="es">Español</option>
                    <option value="en">English</option>
                </select>
            </div>
            <div>
                <label>Tamaño de letra: </label>
                <select id="font-size-select" onChange={handleFontSizeChange}>
                    <option value="small">Pequeño</option>
                    <option value="medium">Mediano</option>
                    <option value="large">Grande</option>
                </select>
            </div>
            <div>
                <button onClick={handleLogin}>Registrarse / Login</button>
            </div>
        </nav>
    );
};

export default Navegacion;