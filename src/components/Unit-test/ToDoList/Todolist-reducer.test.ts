import {AddTodolistAC, ChangeTodoListAC, ChangeTodoLIstFilterAC, RemoveTodolistAC,
        todoListsReducer} from './Todolists-reducer'
import { v1 } from 'uuid'
import {FilterValuesType, TodolistsType} from '../../../App'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistsType>

beforeEach(() => {
    // Перед каждым тестом
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ]
})

test('correct todolist should be removed', () => {
    // Выполнения тестируемого кода
    const endState = todoListsReducer(startState, RemoveTodolistAC(todolistId1))

    // Сверяем ожидаемый результат с реальным
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'
    const endState = todoListsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todoListsReducer(startState, ChangeTodoListAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const endState = todoListsReducer(startState, ChangeTodoLIstFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})