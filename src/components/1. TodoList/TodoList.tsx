import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from '../../App';
import AddItemForm from '../2. Add and change title/AddItemForm';
import { EditableSpan } from '../2. Add and change title/EditableSpan';

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
        <button onClick={onDelete}> x </button>
      </h3>

      <AddItemForm addItem={addTaskHandler} />

      <ul>
        {props.tasks.map((task: TaskType) => {
          const onClickHandler = () => props.removeTask(props.todolistID, task.id);
          const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = event.currentTarget.checked;
            props.changeTaskStatus(props.todolistID, task.id, newIsDoneValue);
          };

          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} onChange={onChangeHandle} />
              <span>{task.title}</span>
              <button onClick={onClickHandler}>✖</button>
            </li>
          );
        })}
      </ul>

      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}>
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}>
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompleteClickHandler}>
          Completed
        </button>
      </div>
    </div>
  );
}

export default TodoList;
