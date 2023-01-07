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
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = React.useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = React.useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    // Для удаления по клику на х
    function removeTask(todolistID: string, id: string) {
        let todolistTasks = tasks[todolistID]
        console.log(todolistTasks)
        tasks[todolistID] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist =  todolists.find(todolists => todolists.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    // Для добавления новой задачи
    function addTask(todolistID: string, title: string) {
        let task = { id: v1(), title: title, isDone: false };
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = [task, ...todolistTasks]
        setTasks({...tasks})
    }



    // Для чекбоксов
    function changeTaskStatus(todolistID: string, id: string, isDone: boolean) {
        let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    return (
        <div className='App'>
            {
                todolists.map(todolist => {
                    let allTodolistTasks = tasks[todolist.id]
                    let tasksForTodolist = allTodolistTasks

                    if(todolist.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                    }

                    if(todolist.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                    }

                    return <TodoList key = {todolist.id}
                                     todolistID={todolist.id}
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
