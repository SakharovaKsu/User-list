import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed' // либо то, либо, либо то
function App() {

    const title = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>(
        [
            { id: 1, title: 'HTML&CSS', isDone: true },
            { id: 2, title: 'JS', isDone: true },
            { id: 3, title: 'React', isDone: false }
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

    const removeTask = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTasks)
    }

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                title={title}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
