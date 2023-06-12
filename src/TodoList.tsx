import React, {FC, useState, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import s from './TodoList.module.css';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

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
    updateTodoList: (todoListId: string, updateTitle: string) => void
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
    filter,
    removeTodoList,
    updateTask,
    updateTodoList}) => {

    const [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const addTaskHandler = (title: string) => {
        addTask(todoListId, title)
    }

    const updateTodoListHandler = (updateTitle: string) => {
        updateTodoList(todoListId, updateTitle)
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
            <div className={t.isDone ? s.isDone : ''} key={t.id}>
                <Checkbox checked={t.isDone} color="success" onChange={changeStatusHandler}/>
                <EditableSpan oldTitle={t.title} callback={(updateTitle) => updateTaskHandler(t.id, updateTitle)}/>
                <IconButton aria-label="delete" color="success" onClick={onClickHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>
        )
    })

    // фильтрация при клике на all
    // const onAllClickHandler = () => {
    //  changeFilter('all')
    //  setButtonName('all')
    // }

    // фильтрация при клике на active
    // const onActiveHandler = () => {
    //   changeFilter('active')
    //   setButtonName('active')
    // }

    // фильтрация при клике на completed
    // const onCompletedHandler = () => {
    //     changeFilter('completed')
    //     setButtonName('completed')
    // }

    // фильтрация при клике
    const tsarHandler = (value: FilterValuesType) => {
        changeFilter(todoListId, value)
        setButtonName(value)
    }

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    return (
        <div className="todoList">
            <div>
                <h3 className={s.title}>
                    <EditableSpan oldTitle={todoListTitle} callback={updateTodoListHandler}/>
                    <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                        <DeleteIcon />
                    </IconButton>
                </h3>
                <AddItemForm callback={addTaskHandler}/>
                <div>{tasksJSX}</div>
                <div>
                    <Button variant={buttonName === 'all' ? 'contained' : 'outlined'}
                            color="success"
                            onClick={() => tsarHandler('all')}
                    >All</Button>
                    <Button variant={buttonName === 'active' ? 'contained' : 'outlined'}
                            color="success"
                            onClick={() => tsarHandler('active')}
                    >Active</Button>
                    <Button variant={buttonName === 'completed' ? 'contained' : 'outlined'}
                            color="success"
                            onClick={() => tsarHandler('completed')}
                    >Completed</Button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
