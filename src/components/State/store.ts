import {tasksReducer} from "../Unit-test/Tasks/Tasks-reducer";
import {todoListsReducer} from "../Unit-test/ToDoList/Todolists-reducer";

import { combineReducers, createStore } from 'redux'

/*
    1. Редакс состоит из store, а он в свою очередь является объектом и он всегда 1. Внутри store хранится state и работает с одним объектом:

   {store} -> state: {
     k: [{}]
     k: [{}]
   }

   Чтобы создать его необходимо написать createStore => const store = createStore(rootReducer)


   2. Нужен для обращение в браузере через консоль, однако, чтобы тайпскрипт
   не ругался нужно комментарием написать @ts-ignore:
   window.store = store


   3. И необходимо создавать store с редюсеррами а их у нас 2. И необходимо эти редюсеры объединить через combineReducers. Это так называемый корневой редюсер, который будет получать все Экшены, а дальше он будет раскидывать все экшены остальным редюсерам

   const rootReducer = combineReducers({ tasks: tasksReducer, todoLists: todoListsReducer })

    4. AppRootStateType => Необходим для автоматической типизация объекта состояние. Работает следующим образом: <typeof rootReducer> - определи какой это тип и врени мне его
*/

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})
export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store