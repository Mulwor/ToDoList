import React from "react";

type PropsType = {
    title: string
}

function TodoList(props: PropsType) {
    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>

                <ul>
                    <li><input type="checkbox" checked={true}/> <span> HyperText Markup Language </span></li>
                    <li><input type="checkbox" checked={true}/> <span> Cascading Style Sheets </span></li>
                    <li><input type="checkbox" checked={true}/> <span> JavaScript </span></li>
                    <li><input type="checkbox" checked={true}/> <span> TypeScript </span></li>
                    <li><input type="checkbox" checked={false}/> <span> React </span></li>
                    <li><input type="checkbox" checked={false}/> <span> Redux Toolkit </span></li>
                </ul>

                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default TodoList