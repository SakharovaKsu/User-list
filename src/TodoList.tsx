import React, {FC} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void // void - это ничего, ставим что получаем на выходе функции
    changeFilter: (filter:FilterValuesType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = ({
    title,
    tasks,
    removeTask,
    changeFilter}) => {

    const tasksJSX:Array<JSX.Element> = tasks.map((t) => {
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => removeTask(t.id)}>x</button>
                </li>
            )
        })

    return (
        <div className="todoList">
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button onClick={() => changeFilter('all')}>All</button>
                    <button onClick={() => changeFilter('active')}>Active</button>
                    <button onClick={() => changeFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
