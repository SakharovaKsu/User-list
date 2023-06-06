import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import s from './TodoList.module.css';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    todoListTitle: string
    todoListId: string
    tasks: TaskType[]
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, filter:FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeStatus: (todoListId: string, taskID: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    updateTask: (todoListId: string, taskId: string, updateTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = ({
    todoListId,
    todoListTitle,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeStatus,
    removeTodoList,
    updateTask}) => {

    const [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const addTaskHandler = (title: string) => {
        addTask(todoListId, title)
    }

    const updateTaskHandler = (tID: string, updateTitle: string) => {
        updateTask(todoListId, tID, updateTitle)
    }

    //  Лишка
    const tasksJSX:Array<JSX.Element> = tasks?.map((t) => {
        const onClickHandler = () => {
            removeTask(todoListId, t.id)
        }

        const changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
            changeStatus(todoListId, t.id, e.currentTarget.checked)
        }

        return (
            <li className={t.isDone ? s.isDone : ''} key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={changeStatusHandler}/>
                <EditableSpan oldTitle={t.title} callback={(updateTitle) => updateTaskHandler(t.id, updateTitle)}/>
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
        changeFilter(todoListId,value)
        setButtonName(value)
    }

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    return (
        <div className="todoList">
            <div>
                <h3>{todoListTitle}</h3>
                <button onClick={removeTodoListHandler}>X</button>
                <AddItemForm callback={addTaskHandler}/>
                <ul>{tasksJSX}</ul>
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
