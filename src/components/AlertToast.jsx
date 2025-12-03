
// Este componente es muy "tonto". Solo sabe mostrar un mensaje y avisar cuando se cierra.

function Alert({ message, onClose }) {
    // Si no hay mensaje, no se muestra nada.
    if (!message) {
        return null;
    }

    // Estilos para que la alerta flote en la esquina superior derecha.
    const alertStyle = {
        position: 'fixed', // <-- La clave para que flote.
        top: '20px',
        right: '20px',
        padding: '15px',
        backgroundColor: '#f8d7da', // Un color rojizo para errores.
        color: '#721c24',
        border: '1px solid #f5c6cb',
        borderRadius: '5px',
        zIndex: 1000 // Asegura que esté por encima de otros elementos.
    };

    return (
        <div style={alertStyle}>
            {message}
            {/* El botón para cerrar llama a la función que recibimos por props. */}
            <button
                onClick={onClose}
                style={{ marginLeft: '15px', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}
            >
                X
            </button>
        </div>
    );
}

export default Alert;