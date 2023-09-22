import React, {useCallback, useEffect} from 'react';
import '../App.css';
import TodoList from '../TodoList/TodoList';
import AddItemForm from '../components/AddItemForm/AddItemForm';
import ButtonAppBar from '../ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTodoListTC, changeFilterAC, getTodoListTC, removeTodoListTC, updateTodoLostTC} from '../state/TodoListReducer';
import {addTaskTC, removeTaskTC, TaskStatuses, TasksType, updateTaskTC} from '../state/TaskReducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch, useAppSelector} from '../state/store';
// не забывай конкретизировать импорты в material ui, что б не тормозила загрузка
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from '../components/ErrorShackbar/ErrorShackbar';



export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskAssocType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {

    // берем данные из store
    const todoList = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskAssocType>(state => state.tasks)

    // уже протипизированный useSelector
    const status = useAppSelector(state => state.app.status)

    // Получаем функцию dispatch из Redux store. Функция dispatch используется для отправки действий (actions)
    const dispatch = useAppDispatch()

    // сетаем туду листы
    useEffect(() => {
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

    return (
        <div className="App">
            <ErrorSnackbar />
            <ButtonAppBar />
            {status === 'loading' && <LinearProgress color='success'/>}

            <Container fixed>
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
            </Container>

        </div>
    );
}

export default AppWithRedux;
