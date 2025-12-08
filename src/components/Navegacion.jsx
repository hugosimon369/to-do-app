import React from 'react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { LanguageContext, useLanguage } from '../context/LanguageContext';

const Navegacion = ({ onToggleHistorial }) => {

    //ESTADOS
    const { theme, setTheme } = useTheme()

    const { language, setLanguage, text } = useLanguage()


    //FUNCIONES 
    const handleThemeToggle = (e) => {
        const newTheme = e.target.value
        setTheme(newTheme)
        console.log('cambiando el tema a: ', { newTheme })
    };

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value
        setLanguage(newLanguage)
        console.log("Idioma cambiado a:", newLanguage, text); // el text llega undefined

    };

    const handleFontSizeChange = (e) => {
        const valor = e.target.value
        if (valor === 'small'){
            document.body.classList.add('small')
            document.body.classList.remove('medium')
            document.body.classList.remove('large')
        }
        if (valor === 'medium'){
            document.body.classList.add('medium')
            document.body.classList.remove('small')
            document.body.classList.remove('large')
        }
        if (valor === 'large'){
            document.body.classList.add('large')
            document.body.classList.remove('small')
            document.body.classList.remove('medium')
        }
        console.log("Tamaño de fuente cambiado a:", valor);
        return valor
    };

    const handleLogin = () => {
        // Lógica para mostrar modal de login/registro
        console.log("Abriendo modal de registro/login...");
    };



    return (
        <nav className='nav'>
            <button onClick={onToggleHistorial}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="9" y1="10" x2="15" y2="10" stroke="#07FE3D" />
                    <line x1="9" y1="14" x2="13" y2="14" stroke="#07FE3D" />
                    <path d="M18.364 7.63604C16.9999 6.27208 15.1199 5.5 13 5.5C9.31913 5.5 6.25356 8.13123 5.61115 11.6406" stroke="#07FE3D"  />
                    <path d="M5.63611 16.364C7.00007 17.7279 8.88007 18.5 11 18.5C14.6809 18.5 17.7464 15.8688 18.3889 12.3594" stroke="#07FE3D" />
                    <polyline points="3.828 19.222 4.222 15.000 7.364 14.172" stroke="#07FE3D"   />
                </svg>
            </button>
            <div className='nav-theme'>
                <label >{text.themeLabel} </label>
                <select id="theme-select" onChange={handleThemeToggle} value={theme}>
                    <option value="light">{text.themeLight}</option>
                    <option value="dark">{text.themeDark}</option>
                </select>
            </div>
            <div>
                <label >{text.languageLabel}</label>
                <select id="language-select" onChange={handleLanguageChange} value={language}>
                    <option value="es">{text.languageES}</option>
                    <option value="en">{text.languageEN}</option>
                </select>
            </div>
            <div>
                <label>{text.sizeLetterLabel}</label>
                <select id="font-size-select" onChange={handleFontSizeChange} >
                    <option value="medium">{text.sizeLetterMedium}</option>
                    <option value="small">{text.sizeLetterLitle}</option>
                    <option value="large">{text.sizeLetterBig}</option>
                </select>
            </div>
            <button onClick={handleLogin}>
                <svg width="32" height="32" viewBox="-2.5 1 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" fill="#242424" rx="4" /> <circle cx="16" cy="10" r="5" stroke="#07FE3D"  />
                    <path d="M6 27C6 21.4772 10.4772 17 16 17C21.5228 17 26 21.4772 26 27" stroke="#07FE3D" />
                </svg>
            </button>
        </nav>
    );
};

export default Navegacion;