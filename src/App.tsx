import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = React.useState([
        { id: 1, title: "HTML&CSS", isDone: false },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "SolidJS", isDone: true },
        { id: 5, title: "WesternJS", isDone: false },
        { id: 6, title: "Zeva", isDone: true},
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    // Для удаления по клику на х
    function removeTask(id: number) {
        let removeTasks = tasks.filter(task => task.id !== id)
        setTasks(removeTasks)
    }

    // Для фильтрации
    let tasksForTodolist = tasks;
    if(filter === "active") {
        tasksForTodolist = tasks.filter(task => !task.isDone === false)
    }
    if(filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <>
            <TodoList title = "What to learn"
                      tasks={tasksForTodolist}
                      removeTask = {removeTask}
                      changeFilter={changeFilter}
            />
        </>
    );
}

export default App;
