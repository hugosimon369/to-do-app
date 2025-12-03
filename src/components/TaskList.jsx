// Asegúrate de importar tu componente TaskItem si lo vas a usar
import TaskItem from './TaskItem';

// 1. Recibimos la prop 'tasks', que es el array que viene de App.jsx.
function TaskList({ tasks, onDelete, onCompleteTask, variante }) {
    return (
        <ul>
            {/* 2. Abrimos llaves {} para usar JavaScript dentro de JSX. */}
            {/* 3. Le decimos: "Toma el array 'tasks' y mapea cada elemento". */}
            {tasks.map((tarea, index) => (

                // 4. Esta es la "instrucción": por cada 'tarea' en el array,
                //    crea un componente TaskItem.

                // La 'key' es un ID único que React necesita. Por ahora, usamos el 'index'.
                <TaskItem
                    key={tarea.id}
                    task={tarea}
                    onDeleteTask={onDelete}
                    onCompleteTask={onCompleteTask}
                    variante={variante} />

                // O, de forma más simple para empezar:
                //<li key={index}>  {tareas.tarea}</li>
            ))}
        </ul>
    );
}

export default TaskList;