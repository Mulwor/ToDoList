import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import {FilterValuesType} from "../App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string) => void
    changeTaskStatus:(id: string, isDone: boolean) => void
    filter: FilterValuesType
}


function TodoList(props: PropsType) {
    let [title, setTitle] = React.useState('')
    const [error, setError] = useState<string | null> (null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value) 
    }

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError("Необходимо написать что-либо")
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active',  props.id)
    const onCompleteClickHandler = () => props.changeFilter('completed',  props.id)

    return (
        <div>
            <h3>{props.title}</h3>
                <div>
                    <input value = {title}
                           onChange={ onChangeHandler }
                           onKeyPress = {onKeyPressHandler}
                           className={error ? 'error' : ""}
                    />
                    <button onClick={ addTaskHandler }>+</button>

                    { error && <div className="error-message">{ error }</div> }
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
                    <button className={props.filter === "all" ? "active-filter" : ""}
                            onClick={ onAllClickHandler }>All</button>
                    <button className={props.filter === "active" ? "active-filter" : ""}
                            onClick={ onActiveClickHandler }>Active</button>
                    <button className={props.filter === "completed" ? "active-filter" : ""}
                            onClick={ onCompleteClickHandler }>Completed</button>
                </div>
            </div>
    )
}

export default TodoList