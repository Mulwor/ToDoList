import React, { ChangeEvent, KeyboardEvent } from "react";
import {FilterValuesType} from "../App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus:(id: string, isDone: boolean) => void
}


function TodoList(props: PropsType) {
    let [title, setTitle] = React.useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value) 
    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }

    const onCompleteClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
                <div>
                    <input value = {title}
                           onChange={ onChangeHandler }
                           onKeyPress = {onKeyPressHandler}
                    />
                    <button onClick={ addTaskHandler }>+</button>
                </div>

                <ul>
                    {props.tasks.map((task: TaskType) => {
                        const onClickHandler = () => props.removeTask(task.id)
                        const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = event.currentTarget.checked
                            props.changeTaskStatus(task.id, newIsDoneValue)
                        }

                        return (
                            <li key = {task.id}>
                                <input type='checkbox' 
                                       checked={task.isDone} 
                                       onChange = {onChangeHandle}       
                                /> 
                                <span>{task.title}</span>
                                <button onClick={ onClickHandler }>✖</button>
                            </li>
                        )
                    })}
                </ul>

                <div>
                    <button onClick={ onAllClickHandler }>All</button>
                    <button onClick={ onActiveClickHandler }>Active</button>
                    <button onClick={ onCompleteClickHandler }>Completed</button>
                </div>
            </div>
    )
}

export default TodoList