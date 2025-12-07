import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";

function TaskForm({ onMensajeroTask }) {
    const { laguage, setLanguage, text } = useContext(LanguageContext)

    const getFechaPredefinida = () => {
        const tomorrow = new Date();
        // setDate se encarga de calcular correctamente si cambia el mes o el año.
        tomorrow.setDate(tomorrow.getDate() + 1);
        const year = tomorrow.getFullYear();
        // Recordatorio: getMonth() es base 0 (Enero=0), por eso sumamos 1.
        const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
        const day = tomorrow.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fechaPredefinida = getFechaPredefinida()  // Lllamamos a la funcion para generar la fecha 

    const [newData, setNewData] = useState({ tarea: "", fecha: fechaPredefinida, valor: 0, originalValor: 0, completed: false })

    const [error, setError] = useState("")

    const handleChange = (e) => {
        let { name, value: originalValue } = e.target;
        if (name === 'valor') {
            // 1. Limpiamos la entrada: Reemplazamos cualquier cosa que NO sea un dígito con nada.
            const digitsOnly = originalValue.replace(/[^0-9]/g, '');
            // 2. Nos aseguramos de que sea solo un dígito.
            originalValue = digitsOnly.slice(-1);
        }
        setNewData(prev => ({ ...prev, [name]: originalValue }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // verificacion 1: ¿Falta la tarea? Si es así, error y salimos.
        if (!newData.tarea.trim()) {
            setError("Falta la DESCRIPCION de la tarea.");
            return;
        }
        // verificacion 2: ¿Falta la fecha? Si es así, error y salimos.
        if (!newData.valor) {
            setError("Falta darle un VALOR.");
            return;
        }
        if (newData.valor.trim() === '' || newData.valor === '0') {
            setError("Debe asignar una prioridad válida (1-9).");
            return;
        }
        // --- Camino Feliz ---
        // Si el código llega hasta aquí, es porque todas las verificaciones pasaron.
        setError(''); // Limpiamos cualquier error previo.
        onMensajeroTask(newData);
        setNewData({ tarea: "", fecha: fechaPredefinida, valor: 0, originalValor: 0, completed: false });
        console.log("agregada: ", newData);
    };


    return (
        <>
            <form
                style={{
                    display: "flex",
                    marginBottom: "20px",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center"
                }}
            >
                <textarea
                    style={{
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "320px",
                        height: '100px'
                    }}
                    name="tarea"
                    type="text"
                    placeholder="Nueva Tarea..."
                    onChange={handleChange}
                    value={newData.tarea}
                />
                <footer style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px"
                }}
                >
                    <input style={{
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "50px"
                    }}
                        type="number"
                        onChange={handleChange}
                        name="valor"
                        value={newData.valor} />
                    <input type="date"
                        name="fecha"
                        value={newData.fecha}
                        onChange={handleChange} />
                </footer>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit" onClick={handleSubmit}>{text.formButton}</button>
            </form>
        </>
    );
}

export default TaskForm;