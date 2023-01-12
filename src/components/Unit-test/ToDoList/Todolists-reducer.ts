import {FilterValuesType, TodolistsType} from "../../../App";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodoListAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type TodolistReducerActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListAT | ChangeTodoListFilterAT



export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: TodolistsType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
]

// При старте приложение сработает наши редюсеры и наш стейт примет данные которые есть у нас в initial state.
export const todoListsReducer = (state: TodolistsType[] = initialState, action: TodolistReducerActionType) : TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // Так как логика приложения не меняется, то мы можем логическую часть с фильтрацией вынести сюда. Если структура кода меняется визуально только, то она не вызывает появления новой логике
            return state.filter((task) => task.id !== action.id)
        }
        case "ADD-TODOLIST": {
            const newTodoList: TodolistsType = {
                id: action.todolistId, title: action.title, filter: 'all'
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
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id
               ? { ...tl, filter: action.filter }
               : tl
            )

        default:
            return state
    }
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const ChangeTodoListAC = (id: string, title: string) : ChangeTodoListAT => ({type: 'CHANGE-TODOLIST-TITLE', title, id})

export const ChangeTodoLIstFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT => ({type: "CHANGE-TODOLIST-FILTER", filter, id, })