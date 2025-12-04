import { useState } from 'react';
// Importamos la frecuencia que creamos arriba
import { ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }) {
    // Aquí vive el estado que queremos compartir globalmente
    const [theme, setTheme] = useState("ligth");
    const data = { theme, setTheme }

    return (
        // Usamos el componente .Provider que vive DENTRO del contexto
        // La prop 'value' es LO QUE ESTAMOS EMITIENDO (el paquete de datos)
        <ThemeContext.Provider value={data}>
            {/* 'children' son todos los componentes que estarán adentro (App, Home, etc.) */}
            {/* Si no ponemos children, la app se vería vacía */}
            {children}
        </ThemeContext.Provider>
    );
}