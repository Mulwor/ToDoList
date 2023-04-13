import "../../App.css";
import AddItemForm from "../add and change title/AddItemForm";
import {
  AddTodolistAC,
  ChangeTodoListAC,
  ChangeTodoLIstFilterAC,
  RemoveTodolistAC,
} from "../Unit-test/ToDoList/Todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../Unit-test/tasks/Tasks-reducer";
import ButtonAppBar from "../material-UI/App-Bar";
import { Container, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { TasksStateType, TodolistsType } from "../../App";
import { TodolistWithRedux } from "./TodoList_with_Redux";

export type FilterValuesType = "all" | "active" | "completed";

function AppWithRedux() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistsType>>((state) => state.todoLists);
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);

  // Для удаления по клику на х
  function removeTask(todolistID: string, id: string) {
    const action = removeTaskAC(id, todolistID);
    dispatch(action);
  }

  // Для добавления новой задачи
  function addTask(todolistID: string, title: string) {
    const action = addTaskAC(title, todolistID);
    dispatch(action);
  }

  // Для чекбоксов
  function changeTaskStatus(todolistID: string, id: string, isDone: boolean) {
    dispatch(changeTaskStatusAC(id, isDone, todolistID));
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId));
  }

  function changeFilter(todolistID: string, value: FilterValuesType) {
    const action = ChangeTodoLIstFilterAC(todolistID, value);
    dispatch(action);
  }

  // Для удаления тудушек
  function removeTodoList(id: string) {
    const action = RemoveTodolistAC(id);
    dispatch(action);
  }

  // Для добавление нового списка тудушек
  function addTodolist(title: string) {
    const action = AddTodolistAC(title);
    dispatch(action);
  }

  // Изменения названия у загаловка тудулиста
  function changeTodolistTitle(id: string, newTitle: string) {
    const action = ChangeTodoListAC(id, newTitle);
    dispatch(action);
  }

  return (
    <div className="App">
      <ButtonAppBar />

      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={4}>
          {todolists.map((todolist) => {
            let allTodolistTasks = tasks[todolist.id];
            let tasksForTodolist = allTodolistTasks;

            if (todolist.filter === "active") {
              tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
            }

            if (todolist.filter === "completed") {
              tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
            }

            return (
              <Grid key={todolist.id} item>
                <Paper style={{ padding: "10px" }}>
                  <TodolistWithRedux todolist={todolist} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
