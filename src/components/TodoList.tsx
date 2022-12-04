import React from "react";

function TodoList() {
    return (
        <div className="App">
            <div>
                <h3>What to learn</h3>
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