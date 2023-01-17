import { ChangeEvent} from 'react';
import { FilterValuesType } from '../App';
import AddItemForm from './Add and change title/AddItemForm';
import { EditableSpan } from './Add and change title/EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistID: string;
  id: string;
  title: string;

  tasks: Array<TaskType>;
  filter: FilterValuesType;

  removeTask: (todolistID: string, taskId: string) => void;
  changeFilter: (todolistID: string, value: FilterValuesType) => void;
  addTask: (todolistID: string, title: string) => void;
  changeTaskStatus: (todolistID: string, id: string, isDone: boolean) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  removeTodoList: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

function TodoList(props: PropsType) {
  const addTaskHandler = (title: string) => props.addTask(props.id, title);
  const onDelete = () => props.removeTodoList(props.todolistID);
  const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle);

  const onAllClickHandler = () => props.changeFilter(props.id, 'all');
  const onActiveClickHandler = () => props.changeFilter(props.id, 'active');
  const onCompleteClickHandler = () => props.changeFilter(props.id, 'completed');

  return (
    <div>
      <h3> 
        <EditableSpan title={props.title} callBack={changeTodolistTitle} />
          <IconButton aria-label="delete" onClick={onDelete}>
            <Delete />
          </IconButton>
      </h3>

      <AddItemForm addItem={addTaskHandler} />

      <ul>
        {
          props.tasks.map((task => {
          const onClickHandler = () => props.removeTask(props.todolistID, task.id);
          const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = event.currentTarget.checked;
            props.changeTaskStatus(props.todolistID, task.id, newIsDoneValue);
          };
          const onTitleChangeHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id);
          }


          return <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <Checkbox size="small"
                        onChange={onChangeHandler}
                        checked={task.isDone}
                        sx ={{color: "#9ccc65"}}
              />

              <EditableSpan title={task.title} callBack={onTitleChangeHandler} />

              <IconButton aria-label="delete" onClick={onClickHandler}>
                <Delete />
              </IconButton>
            </li>
        }))}
      </ul>

      <div>
        <Button variant = {props.filter === "all" ? "outlined" : "contained"}
                size = "small"
                sx = {{ m: 1, color: "black", backgroundColor: "#ffecb3"}}
                onClick = {onAllClickHandler}>All
        </Button>

        <Button variant = {props.filter === "active" ? "outlined" : "contained"}
                onClick = {onActiveClickHandler}
                size = "small"
                sx = {{ m: 1, color: "black", backgroundColor: "#009688"}}
                > Active
        </Button>

        <Button variant = {props.filter === "completed" ? "outlined" : "contained"}
                size = "small"
                sx = {{ m: 1, color: "black", backgroundColor: "#616161"}}
                onClick = {onCompleteClickHandler}> Completed
        </Button>
      </div>
    </div>
  );
}

export default TodoList;
