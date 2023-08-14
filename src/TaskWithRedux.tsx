import React, {ChangeEvent, FC, memo} from 'react';
import s from './TodoList.module.css';
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from './TodoList';
import {useDispatch} from 'react-redux';
import {changeStatusTaskAC, removeTaskAC, updateTaskAC} from './state/TaskReducer';

type TasksPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux: FC<TasksPropsType> = memo(({ task, todolistId}) => {

    const dispatch = useDispatch()

    const removeTask = () => {
        dispatch(removeTaskAC(todolistId, task.id))
        // removeTask(task.id)
    }

    const changeStatusTask = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.checked
        dispatch(changeStatusTaskAC(todolistId, task.id, value))
        // changeStatus(task.id, e.currentTarget.checked)
    }

    const updateTask = (updateTitle: string) => {
        dispatch(updateTaskAC(todolistId, task.id, updateTitle))
    }

    return (
        <div className={task.isDone ? s.isDone : ''}>
            <Checkbox checked={task.isDone} color="success" onChange={changeStatusTask}/>
            <EditableSpan oldTitle={task.title} callback={updateTask}/>
            <IconButton aria-label="delete" color="success" onClick={removeTask}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
});
