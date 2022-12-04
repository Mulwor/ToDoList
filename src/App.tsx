import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";

function App() {
    return (
        <>
            <TodoList title = "What to learn"/>
            <TodoList title = "Who are you"/>
            <TodoList title = "Do you stupid"/>
        </>
    );
}

export default App;
