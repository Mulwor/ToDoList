import { userReducer } from './User-reducer'


test('user reducer should increment only age', () => {
    // Стартовые значения
    const startState = { age: 25, childrenCount: 0, name: 'Ali' }
    const endState = userReducer(startState, {
        type: 'INCREMENT-AGE'
    })

    // Ожидаем получить
    expect(endState.age).toBe(26)
    expect(endState.childrenCount).toBe(0)
})

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 25, childrenCount: 0, name: 'Ali' }
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(1)
    expect(endState.age).toBe(25)
})

test('user reducer should change name of user', () => {
    const startState = { name: 'Ali', age: 20, childrenCount: 2}
    const newName = 'Alex'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
})