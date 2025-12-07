import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

function TaskItem({ task, onDeleteTask, onCompleteTask, variante }) {
    const { text } = useContext(LanguageContext)

    let itemClassName = `task-item ${variante} `;

    itemClassName += task.completed ? "completed" : "pending";

    const handleChange = () => {

        console.log(`actualizando  la ".tarea" del elemento ${task.id} de la lista`)
    }

    return (
        <>
            <li className={itemClassName} >
                <label className="checkbox--label">
                    <input
                        type="checkbox"
                        name="" id="real--checkbox"
                        checked={task.completed}
                        onChange={() => { onCompleteTask(task.id); }}
                    />
                    <span className="fake--checkbox"></span>
                </label>
                <textarea className="textarea--tarea" value={task.tarea} onChange={handleChange}></textarea>
                <span>{task.fecha}</span>
                <button onClick={() => { onDeleteTask(task.id) }}>{text.listBtn}</button>

            </li>
        </>
    )
}
export default TaskItem;