import React from 'react';
import './'
import TodoList from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = React.useState([
        { id: v1(), title: "HTML&CSS", isDone: false },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "SolidJS", isDone: true },
        { id: v1(), title: "WesternJS", isDone: false },
        { id: v1(), title: "Zeva", isDone: true},
    ])

    let [filter, setFilter] = React.useState<FilterValuesType>('all')

    // Для удаления по клику на х
    function removeTask(id: string) {
        let removeTasks = tasks.filter(task => task.id !== id)
        setTasks(removeTasks)
    }

    // Для фильтрации
    let tasksForTodolist = tasks;
    if(filter === "active") {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }
    if(filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    // Для добавления новой задачи
    function addTask(title: string) {
        let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }


    // Для чекбоксов
    function changeTaskStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    return (
        <>
            <TodoList title = "What to learn"
                      tasks={tasksForTodolist}
                      addTask = {addTask}
                      removeTask = {removeTask}
                      changeFilter={changeFilter}
                      changeTaskStatus = {changeTaskStatus}
                      filter = {filter}
            />
        </>
    );
}

export default App;
