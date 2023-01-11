import React from 'react';
import '../../App.css';
import TodoList from '../TodoList';
import { v1 } from 'uuid';
import AddItemForm from '../Add and change title/AddItemForm';
import { AddTodolistAC, ChangeTodoListAC, ChangeTodoLIstFilterAC, RemoveTodolistAC,
    todoListsReducer} from "../Unit-test/ToDoList/Todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../Unit-test/Tasks/Tasks-reducer";
import ButtonAppBar from "../Material-UI/App-Bar";
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../State/store";
import {TasksStateType, TodolistsType} from "../../App";

export type FilterValuesType = 'all' | 'active' | 'completed';

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>( state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    // Для удаления по клику на х
    function removeTask(todolistID: string, id: string) {
        const action = removeTaskAC(id, todolistID)
        dispatch(action)
    }

    // Для добавления новой задачи
    function addTask(todolistID: string, title: string) {
        const action = addTaskAC(title, todolistID)
        dispatch(action)
    }

    // Для чекбоксов
    function changeTaskStatus(todolistID: string, id: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(id, isDone,todolistID))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }


    function changeFilter(todolistID: string, value: FilterValuesType) {
        const action = ChangeTodoLIstFilterAC(todolistID, value)
        dispatch(action)
    }

    // Для удаления тудушек
    function removeTodoList(id: string) {
        const action = RemoveTodolistAC(id)
        dispatch(action)
    }

    // Для добавление нового списка тудушек
    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatch(action)
    }

    // Изменения названия у загаловка тудулиста
    function changeTodolistTitle(id: string, newTitle: string) {
        const action = ChangeTodoListAC(id, newTitle)
        dispatch(action)
    }


    return <div className="App">
            <ButtonAppBar />

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>

                <Grid container spacing={4}>
                    {
                        todolists.map(todolist => {
                            let allTodolistTasks = tasks[todolist.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (todolist.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
                            }

                            if (todolist.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
                            }

                            return <Grid item>
                                <Paper style = {{padding: "10px"}}>
                                    <TodoList
                                        key={todolist.id}
                                        todolistID={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        tasks={tasksForTodolist}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={todolist.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })}
                </Grid>
            </Container>
        </div>
}

export default AppWithRedux;