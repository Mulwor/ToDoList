import {TodolistsType} from "../../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}


export const todoListsReducer = (state: TodolistsType[], action: ActionType) : TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((task) => task.id !== action.id)
        }

        case "ADD-TODOLIST": {
            return [
                ...state,
                { id: v1(), title: action.title, filter: "all" }
            ]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(task => task.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}