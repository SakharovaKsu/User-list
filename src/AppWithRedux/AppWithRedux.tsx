import React, {useCallback} from 'react';
import '../App.css';
import TodoList from '../TodoList';
import AddItemForm from '../AddItemForm/AddItemForm';
import ButtonAppBar from '../ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTodoListAC, changeFilterAC, removeTodoListAC, updateTodoListAC} from '../state/TodoListReducer';
import {addTaskAC, changeStatusTaskAC, removeTaskAC, TaskType, updateTaskAC} from '../state/TaskReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';


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

    // берем данные из store
    const todoList = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskAssocType>(state => state.tasks)

    // Получаем функцию dispatch из Redux store. Функция dispatch используется для отправки действий (actions)
    const dispatch = useDispatch()

    const removeTodoList =  useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])

    // добавление нового тудулиста
    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodoListAC(newTitle))
    }, [dispatch])

    // id всегда слева первая
    const updateTodoList =  useCallback((todoListId: string, updateTitle: string) => {
        dispatch(updateTodoListAC(todoListId, updateTitle))
    }, [dispatch])

    const changeFilter =  useCallback((todoListId: string, value:FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, value))
    }, [dispatch])

    const removeTask =  useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }, [dispatch])

    // через title получаем значение инпута
    const addTask =  useCallback((todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [dispatch])

    const updateTask = useCallback((todoListId: string, taskId: string, updateTitle: string) => {
        dispatch(updateTaskAC(todoListId, taskId, updateTitle))
    }, [dispatch])

    const changeStatus = useCallback((todoListId: string, taskID: string, isDone: boolean) => {
        dispatch(changeStatusTaskAC(todoListId, taskID, isDone))
    }, [dispatch])
    console.log(todoList)
    return (
        <div className="App">
            <ButtonAppBar />

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
                                        updateTask={updateTask}
                                        updateTodoList={updateTodoList}
                                        todoListId={tl.id}
                                        tasks={tasks[tl.id]}
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
