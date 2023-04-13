import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { EditableSpan } from "../add and change title/EditableSpan";
import AddItemForm from "../add and change title/AddItemForm";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { AppRootStateType } from "./store";
import { useDispatch } from "react-redux";
import { TodolistsType } from "../../App";
import {
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
import { TaskType } from "../TodoList";

type TDLype = {
  todolist: TodolistsType;
};

export const TodolistWithRedux = ({ todolist }: TDLype) => {
  const { id, title, filter } = todolist;

  let tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[id]);

  const dispatch = useDispatch();

  function changeTodolistTitle(newTitle: string) {
    const action = ChangeTodoListAC(id, newTitle);
    dispatch(action);
  }

  function removeTodoList() {
    const action = RemoveTodolistAC(id);
    dispatch(action);
  }

  function addTask(title: string) {
    const action = addTaskAC(title, id);
    dispatch(action);
  }

  if (filter === "active") {
    tasks = tasks.filter((task) => !task.isDone);
  }
  if (filter === "completed") {
    tasks = tasks.filter((task) => task.isDone);
  }

  const onAllClickHandler = () => dispatch(ChangeTodoLIstFilterAC(id, "all"));
  const onActiveClickHandler = () => dispatch(ChangeTodoLIstFilterAC(id, "active"));
  const onCompleteClickHandler = () => dispatch(ChangeTodoLIstFilterAC(id, "completed"));

  return (
    <div>
      <h3>
        <EditableSpan title={title} callBack={changeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTask} />

      <ul>
        {tasks.map((task) => {
          const onClickHandler = () => dispatch(removeTaskAC(task.id, id));
          const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = event.currentTarget.checked;
            dispatch(changeTaskStatusAC(task.id, newIsDoneValue, id));
          };
          const onTitleChangeHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(task.id, newValue, id));
          };

          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <Checkbox
                size="small"
                onChange={onChangeHandler}
                checked={task.isDone}
                sx={{ color: "#9ccc65" }}
              />

              <EditableSpan title={task.title} callBack={onTitleChangeHandler} />

              <IconButton aria-label="delete" onClick={onClickHandler}>
                <Delete />
              </IconButton>
            </li>
          );
        })}
      </ul>

      <div>
        <Button
          variant={filter === "all" ? "outlined" : "contained"}
          size="small"
          sx={{ m: 1, color: "black", backgroundColor: "#ffecb3" }}
          onClick={onAllClickHandler}>
          All
        </Button>

        <Button
          variant={filter === "active" ? "outlined" : "contained"}
          onClick={onActiveClickHandler}
          size="small"
          sx={{ m: 1, color: "black", backgroundColor: "#009688" }}>
          {" "}
          Active
        </Button>

        <Button
          variant={filter === "completed" ? "outlined" : "contained"}
          size="small"
          sx={{ m: 1, color: "black", backgroundColor: "#616161" }}
          onClick={onCompleteClickHandler}>
          {" "}
          Completed
        </Button>
      </div>
    </div>
  );
};
