import './App.css'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import Navegacion from './components/Navegacion.jsx';
import MenuLateral from './components/MenuLateral.jsx';
import { useEffect, useState } from 'react';
import { LanguageContext } from './context/LanguageContext.jsx';
import { useContext } from 'react';


function App() {

  const cargarTareasGuardadas = () => { // 1. Creamos una función para cargar los datos
    console.log("Intentando cargar tareas...");
    const tareasGuardadas = localStorage.getItem("taskList");// 2. Leemos el string desde localStorage
    if (tareasGuardadas) {// 3. Verificamos si realmente había algo guardado
      return JSON.parse(tareasGuardadas);// 4. Si sí, lo "desempaquetamos" y lo devolvemos
    } else {
      return [];// 5. Si no, devolvemos un array vacío
    }
  };

  const {language, setLanguage, text} = useContext(LanguageContext)

  // Estados

  const [historialOpen, setHistorialOpen] = useState(false)

  const [taskList, setTaskList] = useState(cargarTareasGuardadas);

  const historialList = taskList.filter((task) => {
    return task.completed === true;
  })


  // Efectos

  useEffect(() => { /* Guardar taskList en localStorage */
    const jsonList = JSON.stringify(taskList)
    localStorage.setItem("taskList", jsonList)
  }, [taskList])

  useEffect(() => { /* COMPLETADOS */
    const taskComplete = tareasToday.filter((task) => {
      return task.completed === true;
    })
    console.log(`lista de completados: `, taskComplete)
  }, [])/*al estar vacio se ejecuta al observase a si mismo, cuando se actualiza el componente entero*/

  useEffect(() => { /* NUEVA FECHA Y MAYOR PRIORIDAD */
    actualizarTareasAntiguas()
  }, [])

  useEffect(() => { /* intervalo CADA 60s / ROLLOVER*/
    const intervalo60s = setInterval(() => {
      verificarRollover()
    }, 60000); // 60,000ms = 1 minuto
    return () => {
      console.log("Limpiando el intervalo antes de desmontar.");
      clearInterval(intervalo60s);
    };
  }, [])

  useEffect(() => {
    if (historialOpen) {
      document.body.classList.add('historial--abierto')
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove(`historial--abierto`)
    }
    return () => {
      document.body.classList.remove(`historial--abierto`)
    }
  }, [historialOpen])


  // Funciones

  const addTask = (newTask) => {
    const taskConId = { ...newTask, id: Date.now(), originalValor: newTask.valor, fechaOriginal: newTask.fecha };
    const updateList = [...taskList, taskConId]
    setTaskList(updateList);
    console.log("lista completa: ", updateList)
    //  setTaskList((prev) => [...prev, newTask]);   //MANERA CORTA PERO ASINCRONA, deja pendiente la actualizacion para el proximo renderizado
  }

  const deleteTask = (idToDelete) => {
    const updateList = taskList.filter((task) => {
      return task.id !== idToDelete;
    })
    setTaskList(updateList);
  }

  const formatDate = (dateObject) => {  // Esta función es nuestra "herramienta de formato"
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const toggleComplete = (idToToggle) => {
    const updatedList = taskList.map((item) => {
      if (item.id === idToToggle) { // 1. ¿Es este el item que queremos cambiar?
        return { // 2. SÍ: Creamos un NUEVO objeto   {}
          ...item, // ...copiando todas las propiedades antiguas    ...
          completed: !item.completed // ...y sobrescribiendo solo   'completed'.
        };
      } else {
        return item;// 3. NO: Devolvemos el item original sin tocarlo.
      }
    });
    setTaskList(updatedList);// 4. Actualizamos el estado con la lista completamente nueva.
  };

  const todayDateObject = new Date(); // 1. Obtenemos los objetos Date que necesitamos
  const tomorrowDateObject = new Date();
  tomorrowDateObject.setDate(tomorrowDateObject.getDate() + 1);

  const fechaToday = formatDate(todayDateObject); // 2. Usamos nuestra herramienta para formatearlos
  const fechaTomorrow = formatDate(tomorrowDateObject);

  const tareasToday = taskList.filter((task) => { return task.fecha === fechaToday }) //.filter() requiere de una funcion para saber que hacer con cada elemeto del array, y el nombre temporal se pone dentro de los parentesis del ArrowFunction  

  const tareasTomorrow = taskList.filter((task) => task.fecha === fechaTomorrow);  //retorno implicito (sin {} ni 'return')

  const tareasFuturas = taskList.filter((task) => task.fecha !== fechaToday && task.fecha !== fechaTomorrow && fechaToday < task.fecha)

  const ordenarTareas = (a, b) => {
    // Criterio 1: Ordenar por 'completed'
    // a.completed (true=1) - b.completed (false=0) = 1 (pone a 'b' primero)
    // a.completed (false=0) - b.completed (true=1) = -1 (pone a 'a' primero)
    // Esto ordena todos los 'false' (pendientes) antes que los 'true' (completados).
    if (a.completed !== b.completed) {
      return a.completed - b.completed;
    }

    // Criterio 2: Si son iguales (ambas completas o ambas pendientes), ordenar por 'valor'
    return b.valor - a.valor; // De mayor a menor prioridad
  };

  tareasToday.sort(ordenarTareas);  // metodo SORT para ordenar por la propiedad VALOR (b-a, para mayor a menor)
  tareasTomorrow.sort(ordenarTareas);
  tareasFuturas.sort(ordenarTareas);

  const toggleHistorial = () => {
    const check = historialOpen
    setHistorialOpen(!check)
    console.log("menu lateral del historial = ", !check)
  }

  const verificarRollover = () => {
    const fechaHoy = formatDate(new Date())
    if (fechaHoy !== diaRegistrado) {
      console.log(`¡Día detectado! Actualizando de ${diaRegistrado} a ${fechaHoy}`);
      actualizarTareasAntiguas()
      setDiaRegistrado(fechaHoy)
    }
  }

  function actualizarTareasAntiguas() {
    console.log("EJECUTANDO LÓGICA DE ROLLOVER...");
    const fechaHoy = formatDate(new Date()); // Usamos tu formatDate

    const listaActualizada = taskList.map((task) => {
      if (task.completed === false && task.fecha < fechaHoy) {
        return {
          ...task,
          fecha: fechaHoy,
          valor: task.valor + 1
        };
      } else {
        return task
      }
    });
    setTaskList(listaActualizada);
  }
  const [diaRegistrado, setDiaRegistrado] = useState(fechaToday);

  return (
    <>
      {historialOpen && <MenuLateral historialList={historialList} onToggleHistorial={toggleHistorial} />}
      <Navegacion onToggleHistorial={toggleHistorial} />
      <main className='main'>
        <section className='list--today'>
          <h3>{text.listTodayTitle}</h3>
          <TaskList tasks={tareasToday} onDelete={deleteTask} onCompleteTask={toggleComplete} variante='today' />
        </section>
        <section className='form'>
          <h1>{text.appTitle}</h1>
          <TaskForm onMensajeroTask={addTask} />
        </section>
        <section className='list--tomorrow'>
          <h3>{text.listTomorrowTitle}</h3>
          <TaskList tasks={tareasTomorrow} onDelete={deleteTask} onCompleteTask={toggleComplete} variante='tomorrow' />
        </section>
      </main>
      <section className='list--eventualy'>
        <h3>{text.listEventualyTitle}</h3>
        <TaskList tasks={tareasFuturas} onDelete={deleteTask} onCompleteTask={toggleComplete} variante='futuras' />
      </section>
    </>
  )
}

export default App
