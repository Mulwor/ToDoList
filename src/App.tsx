import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";

function App() {
    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: false },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "SolidJS", isDone: true },
        { id: 5, title: "WesternJS", isDone: false },
        { id: 6, title: "Zeva", isDone: true},
    ])

    // Для удаления по клику на х
    function removeTask(id: number) {
        let removeTasks = tasks.filter(task => task.id !== id)
        setTasks(removeTasks)
    }


    return (
        <>
            <TodoList title = "What to learn"
                      tasks={tasks}
                      removeTask = {removeTask}
            />
        </>
    );
}

export default App;
