import { TasksStateType } from '../../App'
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

type ActionType = RemoveTaskAT | AddTaskAT | changeTaskStatusAT

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