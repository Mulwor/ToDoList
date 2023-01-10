import {AddTodolistAC, ChangeTodoListAC, ChangeTodoLIstFilterAC, RemoveTodolistAC,
        todoListsReducer} from './Todolists-reducer'
import { v1 } from 'uuid'
import {FilterValuesType, TodolistsType} from '../../../App'

test.skip('correct todolist should be removed', () => {
    // Стартовые значения
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: Array<TodolistsType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ]

    // Выполнения тестируемого кода
    const endState = todoListsReducer(startState, RemoveTodolistAC(todolistId1))

    // Сверяем ожидаемый результат с реальным
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test.skip('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'New Todolist'
    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})
test.skip('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'New Todolist'
    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test.skip('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newFilter: FilterValuesType = 'completed'
    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, ChangeTodoLIstFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})