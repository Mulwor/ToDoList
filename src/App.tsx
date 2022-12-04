import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";

function App() {
    let tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: false },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "SolidJS", isDone: true },
        { id: 5, title: "WesternJS", isDone: false },
        { id: 6, title: "Zeva", isDone: true},
    ]

    // Для удаления по клику на х
    function removeTask(id: number) {
        tasks1 = tasks1.filter(task => task.id !== id)
        console.log(tasks1)
    }


    return (
        <>
            <TodoList title = "What to learn"
                      tasks={tasks1}
                      removeTask = {removeTask}
            />
        </>
    );
}

export default App;
