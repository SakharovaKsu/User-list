import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import AddItemForm from '../components/AddItemForm/AddItemForm';
import Paper from '@mui/material/Paper';
import TodoList from './TodoList/TodoList';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch, useAppSelector} from '../state/store';
import {
    addTodoListTC, changeFilterAC, FilterValuesType,
    getTodoListTC,
    removeTodoListTC,
    TodoListEntityType,
    updateTodoLostTC
} from '../state/TodoListReducer';
import {addTaskTC, removeTaskTC, TaskStatuses, updateTaskTC} from '../state/TaskReducer';
import {TaskAssocType} from '../AppWithRedux/AppWithRedux';
import { Navigate } from 'react-router-dom';

export const TodolistsList = () => {

    // берем данные из store
    const todoList = useSelector<AppRootStateType, TodoListEntityType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskAssocType>(state => state.tasks)

    // уже протипизированный useSelector
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    console.log(isLoggedIn, ' todo')
    // Получаем функцию dispatch из Redux store. Функция dispatch используется для отправки действий (actions)
    const dispatch = useAppDispatch()

    // сетаем туду листы
    useEffect(() => {
        // если пользователь не залогинен, то прирываем эффект
        if(!isLoggedIn) return
        dispatch(getTodoListTC())
    }, [])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListTC(todoListId))
    }, [dispatch])

    // добавление нового тудулиста
    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodoListTC(newTitle))
    }, [dispatch])

    // id всегда слева первая
    const updateTodoList =  useCallback((todoListId: string, updateTitle: string) => {
        dispatch(updateTodoLostTC(todoListId, updateTitle))
    }, [dispatch])

    const changeFilter =  useCallback((todoListId: string, value:FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, value))
    }, [dispatch])

    const removeTask =  useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskTC(todoListId, taskId))
    }, [dispatch])

    // через title получаем значение инпута
    const addTask =  useCallback((todoListId: string, title: string) => {
        dispatch(addTaskTC(todoListId, title))
    }, [dispatch])

    const updateTask = useCallback((todoListId: string, taskId: string, updateTitle: string) => {
        dispatch(updateTaskTC(todoListId, taskId, {title: updateTitle}))
    }, [dispatch])

    const changeStatus = useCallback((todoListId: string, taskID: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoListId, taskID, {status: status}))
    }, [dispatch])

    // Если мы не залогинены, то переотправит на страницу
    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <Grid container style={{padding: '20px 20px 20px 0'}}>
                <AddItemForm callback={addTodoList} />
            </Grid>
            <Grid container spacing={3}>
                {todoList.map(tl => {

                    return (
                        <Grid item>
                            <Paper style={{padding: '20px'}}>
                                <TodoList
                                    key={tl.id}
                                    updateTodoList={updateTodoList}
                                    todoListId={tl.id}
                                    tasks={tasks[tl.id]}
                                    entityStatus={tl.entityStatus}
                                    todoListTitle={tl.title}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    updateTask={updateTask}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
};
