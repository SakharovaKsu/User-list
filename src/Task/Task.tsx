import React, {ChangeEvent, FC, memo} from 'react';
import s from '../TodoList.module.css';
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../TodoList';

type TasksPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    updateTaskHandler: (id: string, updateTitle: string) => void
}

export const Task: FC<TasksPropsType> = memo(({ task, updateTaskHandler, removeTask, changeStatus}) => {

    const onClickHandler = () => {
        removeTask(task.id)
    }

    const changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
        changeStatus(task.id, e.currentTarget.checked)
    }

    const updateTaskHandlerCallback = (updateTitle: string) => updateTaskHandler(task.id, updateTitle)

    return (
        <div className={task.isDone ? s.isDone : ''}>
            <Checkbox checked={task.isDone} color="success" onChange={changeStatusHandler}/>
            <EditableSpan oldTitle={task.title} callback={updateTaskHandlerCallback}/>
            <IconButton aria-label="delete" color="success" onClick={onClickHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
});
