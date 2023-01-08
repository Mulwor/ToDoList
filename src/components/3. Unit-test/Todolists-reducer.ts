import {TodolistsType} from "../../App";
import {v1} from "uuid";


export const REMOVE_TODOLIST = "REMOVE-TODOLIST" as const
export const ADD_TODOLIST = "ADD-TODOLIST" as const
export const CHANGE_TODOLIST = 'CHANGE-TODOLIST-TITLE' as const

type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST,
    id: string
}

type AddTodoListAT = {
    type: typeof ADD_TODOLIST,
    title: string
}

type ChangeTodoListAT = {
    type: typeof CHANGE_TODOLIST,
    id: string,
    title: string
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListAT

export const todoListsReducer = (state: TodolistsType[], action: ActionType) : TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // Так как логика приложения не меняется, то мы можем логическую часть с фильтрацией вынести сюда. Если структура кода меняется визуально только, то она не вызывает появления новой логике
            return state.filter((task) => task.id !== action.id)
        }

        case "ADD-TODOLIST": {
            const newTodoList: TodolistsType = {
                id: v1(), title: action.title, filter: 'all'
            }
            return [...state, newTodoList]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(task => task.id === action.id)
            if (todolist) {
               todolist.title = action.title
            }
            return [...state]

            // return state.map(tl => tl.id === action.id
            //    ? { ...tl, title: action.title }
            //   : tl
            // )
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}