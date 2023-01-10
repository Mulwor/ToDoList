import { TasksStateType } from '../../../App'
import {AddTodoListAT, RemoveTodoListAT} from "../ToDoList/Todolists-reducer";
import {v1} from "uuid";

export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskAT = {
    type: "ADD-TASK"
    todolistID: string,
    title: string
}

export type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string,
    taskId: string,
    isDone: boolean
}

export type changeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string,
    newTitle: string,
    todolistId: string
}

type ActionType = RemoveTaskAT | AddTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: ActionType) : TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId].filter((task) => task.id !== action.taskId);
            stateCopy[action.todolistId] = tasks
            return stateCopy
        }

        case "ADD-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistID];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistID] = newTasks;
            return stateCopy
        }

        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId].find((task) => task.id === action.taskId);
            if (tasks) {
                tasks.isDone = action.isDone;
            }
            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId].find(task => task.id === action.taskId);
            if (tasks) {
                tasks.title = action.newTitle;
            }
            return stateCopy
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return { type: 'REMOVE-TASK', todolistId, taskId }
}

export const addTaskAC = (title: string, todolistID: string): AddTaskAT => {
    return { type: "ADD-TASK", title, todolistID}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusAT => {
    return { type: "CHANGE-TASK-STATUS", isDone, todolistId, taskId}
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): changeTaskTitleAT => {
    return { type: "CHANGE-TASK-TITLE", newTitle, todolistId, taskId}
}