import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import s from '../TodoList/TodoList.module.css';
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {
    changeStatusTaskAC,
    TaskStatuses,
    TasksType,
    updateTaskAC
} from '../state/TaskReducer';

type TasksPropsType = {
    task: TasksType
    todolistId: string
    removeTask: (todoListId: string, taskId: string) => void
}

export const TaskWithRedux: FC<TasksPropsType> = memo(({ task, todolistId, removeTask}) => {

    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => removeTask(todolistId, task.id), [todolistId, task.id])

    const changeStatusTask = useCallback((e:ChangeEvent<HTMLInputElement>) => {

        const newIsDoneValue = e.currentTarget.checked
        dispatch(changeStatusTaskAC(todolistId, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))

    },[todolistId, task.id])

    const updateTask = useCallback((updateTitle: string) => {
        dispatch(updateTaskAC(todolistId, task.id, updateTitle))
    }, [todolistId, task.id])

    return (
        <div className={task.status === TaskStatuses.Completed ? s.status : ''}>
            {/* если чекнуто, то статус ставим Completed */}
            <Checkbox checked={task.status === TaskStatuses.Completed} color="success" onChange={changeStatusTask}/>
            <EditableSpan oldTitle={task.title} callback={updateTask}/>
            <IconButton aria-label="delete" color="success" onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
});
