import { tasksReducer } from "../Unit-test/tasks/Tasks-reducer";
import { todoListsReducer } from "../Unit-test/ToDoList/Todolists-reducer";
import { combineReducers, legacy_createStore } from "redux";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
});

export const store = legacy_createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;

// Нужен для обращение в браузере через консоль, однако, чтобы тайпскрипт не ругался нужно комментарием написать
// @ts-ignore
window.store = store;
