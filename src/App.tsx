import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";

function App() {
    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: false },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "SolidJS", isDone: true },
        { id: 5, title: "WesternJS", isDone: false },
        { id: 6, title: "Zeva", isDone: true}
    ]


    return (
        <>
            <TodoList title = "What to learn" tasks={tasks1}/>
        </>
    );
}

export default App;
