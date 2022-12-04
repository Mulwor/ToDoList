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
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am your father", isDone: false },
        { id: 3, title: "Luke, i'm alive", isDone: true },
        { id: 4, title: "Luke, i'm sleeping", isDone: false },
        { id: 5, title: "Luke, shut up", isDone: true }
    ]


    return (
        <>
            <TodoList title = "What to learn" tasks={tasks1}/>
            <TodoList title = "Who are you" tasks={tasks2}/>
        </>
    );
}

export default App;
