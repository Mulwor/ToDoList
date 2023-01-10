import React from 'react';
import '../../App.css';
import TodoList from '../1. TodoList/TodoList';
import { v1 } from 'uuid';
import AddItemForm from '../2. Add and change title/AddItemForm';
import { AddTodolistAC, ChangeTodoListAC, ChangeTodoLIstFilterAC, RemoveTodolistAC,
  todoListsReducer} from "./ToDoList/Todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./Tasks/Tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed';



function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchInTodoList] = React.useReducer(todoListsReducer,[
      // стартовое значение и значение которое будет менять состояние и у неё будет 2 функции; dispatch - одна будет отправлять action в todolists-reducer, другая - в tasks-reducer
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasks, dispatchInTasks] = React.useReducer(tasksReducer,{
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  });

  // Для удаления по клику на х
  function removeTask(todolistID: string, id: string) {
      const action = removeTaskAC(id, todolistID)
      dispatchInTasks(action)
  }

  // Для добавления новой задачи
  function addTask(todolistID: string, title: string) {
      const action = addTaskAC(title, todolistID)
      dispatchInTasks(action)
  }

  // Для чекбоксов
  function changeTaskStatus(todolistID: string, id: string, isDone: boolean) {
    dispatchInTasks(changeTaskStatusAC(id, isDone,todolistID))
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatchInTasks(changeTaskTitleAC(id, newTitle, todolistId))
  }



  function changeFilter(todolistID: string, value: FilterValuesType) {
    const action = ChangeTodoLIstFilterAC(todolistID, value)
    dispatchInTodoList(action)
  }

  // Для удаления тудушек
  function removeTodoList(id: string) {
    const action = RemoveTodolistAC(id)
    dispatchInTodoList(action)
    dispatchInTasks(action)
  }

  // Для добавление нового списка тудушек
  function addTodolist(title: string) {
    const action = AddTodolistAC(title)
    dispatchInTodoList(action)
    dispatchInTasks(action)
  }

  // Изменения названия у загаловка тудулиста
  function changeTodolistTitle(id: string, newTitle: string) {
    const action = ChangeTodoListAC(id, newTitle)
    dispatchInTodoList(action)
  }


  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((todolist) => {
        let allTodolistTasks = tasks[todolist.id];
        let tasksForTodolist = allTodolistTasks;

        if (todolist.filter === 'active') {
          tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
        }
        if (todolist.filter === 'completed') {
          tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
        }

        return (
          <TodoList
            key={todolist.id}
            todolistID={todolist.id}
            id={todolist.id}
            title={todolist.title}
            tasks={tasksForTodolist}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeFilter}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            filter={todolist.filter}
            removeTodoList={removeTodoList}
            changeTodolistTitle={changeTodolistTitle}
          />
        );
      })}
    </div>
  );
}

export default App;