import React, {FC, useCallback, memo} from 'react';
import s from './TodoList.module.css';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {ButtonWithMemo} from '../ButtonWithMemo';
import {TaskWithRedux} from '../Task/TaskWithRedux';
import {TaskStatuses, TasksType} from '../state/TaskReducer';
import {FilterValuesType} from '../state/TodoListReducer';

type TodoListPropsType = {
    todoListTitle: string
    todoListId: string
    tasks: TasksType[]
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, filter:FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeStatus: (todoListId: string, taskID: string, status: TaskStatuses) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    updateTask: (todoListId: string, taskId: string, updateTitle: string) => void
    updateTodoList: (todoListId: string, updateTitle: string) => void
}

const TodoList: FC<TodoListPropsType> = memo(({
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

    const addTaskHandler = useCallback((title: string) => {
        addTask(todoListId, title)
    }, [addTask, todoListId])

    const removeTodoListHandler = () => {
        removeTodoList(todoListId);
    }

    const updateTodoListHandler = (updateTitle: string) => {
        updateTodoList(todoListId, updateTitle)
    }

    if(filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }

    if(filter === 'completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    // фильтрация при клике
    const tsarHandler = useCallback((value: FilterValuesType) => {
        changeFilter(todoListId, value)
    }, [changeFilter, todoListId])

    //  Лишка
    const tasksJSX:Array<JSX.Element> = tasks?.map((t) => {
        return (
            <TaskWithRedux key={t.id} task={t} todolistId={todoListId}/>
        )
    })

    return (
        <div>
            <div>
                <h3 className={s.title}>
                    <EditableSpan oldTitle={todoListTitle} callback={updateTodoListHandler}/>
                    <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                        <DeleteIcon />
                    </IconButton>
                </h3>
                <AddItemForm callback={addTaskHandler}/>
                <div>{tasksJSX}</div>
                <div className={s.button}>
                    <ButtonWithMemo title={'All'}
                                    variant={filter === 'all' ? 'contained' : 'outlined'}
                                    color={'success'}
                                    onClick={() => tsarHandler('all')}
                    />
                    <ButtonWithMemo title={'Active'}
                                    variant={filter === 'active' ? 'contained' : 'outlined'}
                                    color={'success'}
                                    onClick={() => tsarHandler('active')}
                    />
                    <ButtonWithMemo title={'Completed'}
                                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                                    color={'success'}
                                    onClick={() => tsarHandler('completed')}
                    />
                </div>
            </div>
        </div>
    );
})

export default TodoList;
