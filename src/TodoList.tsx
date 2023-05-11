import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    todoListTitle: string
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
    todoListTitle,
    tasks,
    removeTask,
    changeFilter,
    addTask}) => {

    let [title, setTitle] = useState('')

    const tasksJSX:Array<JSX.Element> = tasks.map((t) => {
        const onClickHandler = () => {
            removeTask(t.id)
        }

        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickHandler}>x</button>
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
        addTask(title) // добавляем новую таску
        setTitle('') // делаем пустую строку по умолчанию после добавления новой таски
    }

    // Получаем значение из инпута и добавляем в setInput
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    // Добвляем новую таску при нажатии на Enter
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') newTask()
    }

    return (
        <div className="todoList">
            <div>
                <h3>{todoListTitle}</h3>
                <div>
                    <input
                        value={title}
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
