import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm/AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodoListAC,
    changeFilterAC,
    FilterValuesType,
    removeTodoListAC,
    TodoListReducer, TodoListType,
    updateTodoListAC
} from './state/TodoListReducer';
import {addTaskAC, changeStatusTaskAC, removeTaskAC, TasksReducer, updateTaskAC} from './state/TaskReducer';




const todoListId1 = v1()
const todoListId2 = v1()

const defTasks = {
    [todoListId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'TS', isDone: false}
    ],
    [todoListId2]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'TS', isDone: false}
    ]
}

// [todoListId1] обернули в скобки, что б получить то, что лежит в переменной, если ставим без кавычек, то этот ключ превратится в стрингу под капотом

export const defTodo: TodoListType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}
]

function App() {

    const [tasks, dispatchTasks] = useReducer(TasksReducer,defTasks)
    const [todoList, dispatchTodoList] = useReducer(TodoListReducer,defTodo)

    const removeTodoList = (todoListId: string) => {
        dispatchTodoList(removeTodoListAC(todoListId))
    }

    // добавление нового тудулиста
    const addTodoList = (newTitle: string) => {
        // const todoListId = v1()
        dispatchTodoList(addTodoListAC(newTitle))
    }

    // id всегда слева первая
    const updateTodoList = (todoListId: string, updateTitle: string) => {
        dispatchTodoList(updateTodoListAC(todoListId, updateTitle))
    }

    const changeFilter = (todoListId: string, value: FilterValuesType) => {
        dispatchTodoList(changeFilterAC(todoListId, value))
    }

    const removeTask = (todoListId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todoListId, taskId))
    }

    // через title получаем значение инпута
    const addTask = (todoListId: string, title: string) => {
        dispatchTasks(addTaskAC(todoListId, title))

    }

    const updateTask = (todoListId: string, taskId: string, updateTitle: string) => {
        dispatchTasks(updateTaskAC(todoListId, taskId, updateTitle))
    }

    const changeStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        dispatchTasks(changeStatusTaskAC(todoListId, taskID, isDone))
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

export default App;
