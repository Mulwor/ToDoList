import React from 'react';
import './App.css';
import TodoList, { TaskType } from './components/1. TodoList/TodoList';
import { v1 } from 'uuid';
import AddItemForm from './components/2. Add and change title/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = React.useState<Array<TodolistsType>>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ]);
  let [tasks, setTasks] = React.useState<TasksStateType>({
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
    let todolistTasks = tasks[todolistID];
    tasks[todolistID] = todolistTasks.filter((task) => task.id !== id);
    setTasks({ ...tasks });
  }

  // Для добавления новой задачи
  function addTask(todolistID: string, title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasks[todolistID];
    tasks[todolistID] = [task, ...todolistTasks];
    setTasks({ ...tasks });
  }

  function changeFilter(todolistID: string, value: FilterValuesType) {
    let todolist = todolists.find((todolists) => todolists.id === todolistID);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }
  // Для чекбоксов
  function changeTaskStatus(todolistID: string, id: string, isDone: boolean) {
    let todolistTasks = tasks[todolistID];
    let task = todolistTasks.find((task) => task.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === id);
    if (task) {
        task.title = newTitle;
        setTasks({...tasks});
    }
}



  // Для удаления тудушек
  function removeTodoList(id: string) {
    setTodolists(todolists.filter((todolist) => todolist.id !== id));
    delete tasks[id];
    setTasks({ ...tasks });
  }
  // Для добавление нового списка тудушек
  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistsType = {
      id: newTodolistId,
      title: title,
      filter: 'all',
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({
      ...tasks,
      [newTodolistId]: [],
    });
  }
  // Изменения названия у загаловка тудулиста
  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find((item) => item.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
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