import React from 'react';
import './App.css'
import TodoList from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let [todolists, setTodolists] = React.useState<Array<TodolistsType>>([
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'completed'},
    ])

    let [tasks, setTasks] = React.useState([
        { id: v1(), title: "HTML&CSS", isDone: false },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "SolidJS", isDone: true },
        { id: v1(), title: "WesternJS", isDone: false },
        { id: v1(), title: "Zeva", isDone: true},
    ])

    // Для удаления по клику на х
    function removeTask(id: string) {
        let removeTasks = tasks.filter(task => task.id !== id)
        setTasks(removeTasks)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist =  todolists.find(todolists => todolists.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
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
        <div className='App'>
            {
                todolists.map(todolist => {
                    let tasksForTodolist = tasks;

                    if(todolist.filter === "active") {
                        tasksForTodolist = tasks.filter(task => task.isDone === false)
                    }

                    if(todolist.filter === "completed") {
                        tasksForTodolist = tasks.filter(task => task.isDone === true)
                    }

                    return <TodoList key = {todolist.id}
                                     id = {todolist.id}
                                     title = {todolist.title}
                                     tasks={tasksForTodolist}
                                     addTask = {addTask}
                                     removeTask = {removeTask}
                                     changeFilter={changeFilter}
                                     changeTaskStatus = {changeTaskStatus}
                                     filter = {todolist.filter}
                    />

                })
            }
        </div>
    );
}

export default App;
