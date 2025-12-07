import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

function MenuLateral({ historialList, onToggleHistorial }) {
    const { text } = useContext(LanguageContext)

    const tareasAgrupadas = historialList.reduce((carrito, tarea) => {
        const fecha = tarea.fecha; // O 'fechaCompletado' si la tienes        
        if (!carrito[fecha]) {// 1. ¿Ya existe la caja para esta fecha en el carrito?
            carrito[fecha] = [];// 2. Si no, crea la caja (un array vacío)
        }
        carrito[fecha].push(tarea);// 3. Mete la tarea en la caja correcta
        return carrito;        // 4. Devuelve el carrito actualizado para la siguiente iteración
    }, {}); // <-- El {} es el carrito vacío inicial
    // 'tareasAgrupadas' ahora es el objeto { "fecha1": [tareas], "fecha2": [tareas] }
    const handleMenuClick = (e) => {
        // ¡LA CLAVE!
        // Detiene la propagación del evento. El clic "muere" aquí
        // y nunca llega al <div className="fondo">.
        e.stopPropagation();
    }

    const ordenarFechas = (a, b) => {
        return b.localeCompare(a)
    }

    return (
        <>
            <div className="fondo" onClick={onToggleHistorial}>
                <div className="menu--lateral" onClick={handleMenuClick}>
                    <h2 className="historial--titulo">
                        {text.historyTitle}
                    </h2>
                    <div>
                        {Object.keys(tareasAgrupadas).sort(ordenarFechas).map((fecha) => (
                            <div key={fecha} className="historial--dia">
                                <h3>{fecha}</h3>
                                <ul className="historial--ul">
                                    {tareasAgrupadas[fecha].map((tarea) => (
                                        <li key={tarea.id}>{tarea.tarea}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuLateral