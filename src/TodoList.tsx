import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void // void - это ничего, ставим что получаем на выходе функции
    changeFilter: (filter:FilterValuesType) => void
    addTask: (input: string) => void
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
    changeFilter,
    addTask}) => {

    let [input, setInput] = useState('')

    const tasksJSX:Array<JSX.Element> = tasks.map((t) => {
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => removeTask(t.id)}>x</button>
                </li>
            )
        })

    // фильтрация при клике на all
    const onAllClickHandler = () => {
        changeFilter('all')
    }

    // фильтрация при клике на active
    const onActiveHandler = () => {
        changeFilter('active')
    }

    // фильтрация при клике на completed
    const onCompletedHandler = () => {
        changeFilter('completed')
    }

    const newTask = () => {
        addTask(input) // добавляем новую таску
        setInput('') // делаем пустую строку по умолчанию после добавления новой таски
    }

    // Получаем значение из инпута и добавляем в setInput
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }

    // Добвляем новую таску при нажатии на Enter
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') newTask()
    }

    return (
        <div className="todoList">
            <div>
                <h3>{title}</h3>
                <div>
                    <input
                        value={input}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}/>
                    <button onClick={newTask}>+</button>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveHandler}>Active</button>
                    <button onClick={onCompletedHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
