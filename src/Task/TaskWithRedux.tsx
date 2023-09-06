import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import s from '../TodoList.module.css';
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {changeStatusTaskAC, removeTaskAC, TaskStatuses, TasksType, updateTaskAC} from '../state/TaskReducer';

type TasksPropsType = {
    task: TasksType
    todolistId: string
}

export const TaskWithRedux: FC<TasksPropsType> = memo(({ task, todolistId}) => {

    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todolistId, task.id))
    }, [todolistId, task.id])

    const changeStatusTask = useCallback((e:ChangeEvent<HTMLInputElement>) => {

        const newIsDoneValue = e.currentTarget.checked
        dispatch(changeStatusTaskAC(todolistId, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))

    },[todolistId, task.id])

    const updateTask = useCallback((updateTitle: string) => {
        dispatch(updateTaskAC(todolistId, task.id, updateTitle))
    }, [todolistId, task.id])

    return (
        <div className={task.status === TaskStatuses.Completed ? s.status : ''}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="success" onChange={changeStatusTask}/>
            <EditableSpan oldTitle={task.title} callback={updateTask}/>
            <IconButton aria-label="delete" color="success" onClick={removeTask}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
});
