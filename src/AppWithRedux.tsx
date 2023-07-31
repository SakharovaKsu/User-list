import React, {useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTodoListAC, changeFilterAC, removeTodoListAC, TodoListReducer, updateTodoListAC} from './TodoListReducer';
import {addTaskAC, changeStatusTaskAC, removeTaskAC, TasksReducer, updateTaskAC} from './TaskReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskAssocType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    // беремен данные из store
    const todoList = useSelector<AppRootStateType, TodoListType[]>(state => state.todoList)
    const tasks = useSelector<AppRootStateType, TaskAssocType>(state => state.tasks)

    // Получаем функцию dispatch из Redux store. Функция dispatch используется для отправки действий (actions)
    const dispatch = useDispatch()

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }

    // добавление нового тудулиста
    const addTodoList = (newTitle: string) => {
        dispatch(addTodoListAC(newTitle))
    }

    // id всегда слева первая
    const updateTodoList = (todoListId: string, updateTitle: string) => {
        dispatch(updateTodoListAC(todoListId, updateTitle))
    }

    const changeFilter = (todoListId: string, value:FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, value))
    }

    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }

    // через title получаем значение инпута
    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))

    }

    const updateTask = (todoListId: string, taskId: string, updateTitle: string) => {
        dispatch(updateTaskAC(todoListId, taskId, updateTitle))
    }

    const changeStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        dispatch(changeStatusTaskAC(todoListId, taskID, isDone))
    }

    return (
        <div className="App">
            <ButtonAppBar />

            <Container fixed>
                <Grid container style={{padding: '20px 20px 20px 0'}}>
                    <AddItemForm callback={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {todoList.map(tl => {

                        let tasksForTodoList = tasks[tl.id]

                        if(tl.filter === 'active') {
                            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone )
                        }

                        if(tl.filter === 'completed') {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone )
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '20px'}}>
                                    <TodoList
                                        key={tl.id}
                                        updateTask={updateTask}
                                        updateTodoList={updateTodoList}
                                        todoListId={tl.id}
                                        tasks={tasksForTodoList}
                                        todoListTitle={tl.title}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
