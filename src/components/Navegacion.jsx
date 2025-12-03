import React from 'react';

const Navegacion = ({ onToggleHistorial }) => {
    // Las funciones para manejar los cambios (tema, idioma, etc.)
    // se implementarían aquí, usualmente conectadas a un estado global (Context API, Redux).

    const handleThemeToggle = () => {
        // Lógica para cambiar entre tema claro y oscuro
        console.log("Cambiando tema...");
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
            <div>
                <button onClick={onToggleHistorial}>
                    =
                </button>
            </div>
            <div>
                <label htmlFor="language-select">tema: </label>
                <select id="theme-select" onChange={handleThemeToggle}>
                    <option value="black">oscuro</option>
                    <option value="white">claro</option>
                </select>
            </div>
            <div>
                <label htmlFor="language-select">Idioma: </label>
                <select id="language-select" onChange={handleLangChange}>
                    <option value="es">Español</option>
                    <option value="en">English</option>
                </select>
            </div>
            <div>
                <label htmlFor="font-size-select">Tamaño de letra: </label>
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