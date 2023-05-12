import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed' // либо то, либо, либо то
function App() {

    const todoListTitle = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>(
        [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false }
        ]
    )
    const [filter, setFilter] = useState<FilterValuesType>('all') // all это по умолчанию

    const changeFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }
    const getFilterTasks = (tasks:Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone) // те что еще таски не выполненны
            case 'completed':
                return  tasks.filter(t => t.isDone) // выполненные таски
            default:
                return tasks // возвращаем все таски, если верхние в пролете
        }
    }
    const filteredTasks: Array<TaskType> = getFilterTasks(tasks, filter)

    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTasks)
    }

    // Добавление таски
    // через title получаем значение инпута
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks] // Добавляем новую таску в массив
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                todoListTitle={todoListTitle}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
