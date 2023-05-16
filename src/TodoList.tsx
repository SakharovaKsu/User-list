import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import s from './TodoList.module.css';

type TodoListPropsType = {
    todoListTitle: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void // void - это ничего, ставим что получаем на выходе функции
    changeFilter: (filter:FilterValuesType) => void
    addTask: (input: string) => void
    changeStatus: (taskID: string, checkedValue: boolean) => void
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
    addTask,
    changeStatus}) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null >('') // принимает либо строку, либо null
    const [buttonName, setButtonName] = useState<FilterValuesType>('all')

    //  Лишка
    const tasksJSX:Array<JSX.Element> = tasks.map((t) => {
        const onClickHandler = () => {
            removeTask(t.id)
        }

        const changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
            changeStatus(t.id, e.currentTarget.checked)
        }

        return (
            <li className={t.isDone ? s.isDone : ''} key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={changeStatusHandler}/>
                <span>{t.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })

    // фильтрация при клике на all
    // const onAllClickHandler = () => {
    //     changeFilter('all')
    //     setButtonName('all')
    // }

    // фильтрация при клике на active
    // const onActiveHandler = () => {
    //     changeFilter('active')
    //     setButtonName('active')
    // }

    // фильтрация при клике на completed
    // const onCompletedHandler = () => {
    //     changeFilter('completed')
    //     setButtonName('completed')
    // }

    // фильтрация при клике
    const tsarHandler = (value: FilterValuesType) => {
        changeFilter(value)
        setButtonName(value)
    }

    const newTask = () => {
        // если после trim остается хоть один знак, то добавляй новую таску, если же знаков нет, то не добавляешь
        // trim убирает не нужные пробелы
        if(title.trim()) {
            addTask(title.trim()) // добавляем новую таску
            setTitle('') // делаем пустую строку по умолчанию после добавления новой таски
        } else {
            setError('Title is required') // ошибка если ничего не набрано в инпуте
        }

    }

    // Получаем значение из инпута и добавляем в setInput
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null) // если начали печатать в инпуте, то ошибка переходит уже в false
        setTitle(e.currentTarget.value)
        // обращаемся к инпуту через событие e.currentTarget к его значению, которое хочет напечататься и отправляем его в стейт
    }

    // Добавляем новую таску при нажатии на Enter
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') newTask()
    }

    return (
        <div className="todoList">
            <div>
                <h3>{todoListTitle}</h3>
                <div>
                    <input className={error ? s.error : ''}
                         // в value добавляем title, в котором хранится наше значение в стейте (25 строка)
                        value={title}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}/>
                    <button onClick={newTask}>+</button>
                </div>
                {/* если error ровняется true, то показываем ошибку */}
                {error && <div className={s.errorMessage}>{error}</div>}
                <ul> {tasksJSX}</ul>
                <div>
                    <button
                        className={buttonName === 'all' ? s.allFilter : ''}
                        onClick={() => tsarHandler('all')}
                    >All</button>

                    <button
                        className={buttonName === 'active' ? s.allFilter : ''}
                        onClick={() => tsarHandler('active')}
                    >Active</button>

                    <button
                        className={buttonName === 'completed' ? s.allFilter : ''}
                        onClick={() => tsarHandler('completed')}
                    >Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
