import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import s from '../TodoList.module.css';
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskStatuses, TasksType,} from '../../../state/TaskReducer';

type TasksPropsType = {
    task: TasksType
    todolistId: string
    removeTask: (todoListId: string, taskId: string) => void
    changeStatus: (todoListId: string, taskID: string, status: TaskStatuses) => void
    updateTask: (todoListId: string, taskId: string, updateTitle: string) => void
}

export const TaskWithRedux: FC<TasksPropsType> = memo(({ task, todolistId, removeTask, changeStatus, updateTask}) => {

    const removeTaskHandler = useCallback(() => removeTask(todolistId, task.id), [todolistId, task.id])

    const changeStatusTask = useCallback((e:ChangeEvent<HTMLInputElement>) => {

        const newIsDoneValue = e.currentTarget.checked
        changeStatus(todolistId, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)

    },[todolistId, task.id])

    const updateTitle = useCallback((updateTitle: string) => {
        updateTask(todolistId, task.id, updateTitle)
    }, [todolistId, task.id])

    return (
        <div className={task.status === TaskStatuses.Completed ? s.status : ''}>
            {/* если чекнуто, то статус ставим Completed */}
            <Checkbox checked={task.status === TaskStatuses.Completed} color="success" onChange={changeStatusTask}/>
            <EditableSpan oldTitle={task.title} callback={updateTitle}/>
            <IconButton aria-label="delete" color="success" onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
});
