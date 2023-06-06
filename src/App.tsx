import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


export type FilterValuesType = 'all' | 'active' | 'completed' // либо то, либо, либо то
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskAssocType = {
    [key: string] : TaskType[]
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasks, setTasks] = useState<TaskAssocType>({
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
    })

    // [todoListId1] обернули в скобки, что б получить то, что лежит в переменной, если ставим без кавычек, то этот ключ превратится в стрингу под капотом

    const [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    // id всегда слева первая
    const changeStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        // setTasks(tasks.map(el => el.id === taskID ? {...el, isDone: checkedValue} : el)) // делаем копию через map (массива и всех объектов), ищем id (а можем и не найти, то ничего не возвращает), если нашла - копируем объект (...el). и перезаписываем isDone: checkedValue. Он перезапишется так как старое значение будет совпадать по названию с новым

        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskID ? {...el, isDone} : el)})

    }

    const changeFilter = (todoListId: string, value:FilterValuesType) => {
        setTodoList(todoList.map(el => el.id === todoListId ? {...el, filter: value} : el))
        // копируем полностью объект и после этого вносим изменения
    }

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})
    }

    // Добавление таски
    // через title получаем значение инпута
    const addTask = (todoListId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}


        if(tasks[todoListId]) {
            setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        } else {
            setTasks({...tasks, [todoListId]: [newTask]})
        }

        // {...tasks} - копируем весь таск, далее копируем массив тасок по id, в эту копию добавляем новую таску (newTask) и копируем ...tasks[todoListId]
    }

    const removeTodoList = (todoListId: string) => {
    setTodoList(todoList.filter(el => el.id !== todoListId))
        delete tasks[todoListId] // удаляем еще таску, так как она уже больше не нужна, так как удалился todoList, а хлам не нужно хранить
    }

    // добавление нового тудулиста
    const addTodoList = (newTitle: string) => {
        const todoListId = v1()
        const newTodo: TodoListType = {id: todoListId, title: newTitle, filter: 'all'}
        setTodoList([...todoList, newTodo])
        setTasks({...tasks, [todoListId]:[]})
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodoList} />
            {todoList.map(tl => {

                let tasksForTodoList = tasks[tl.id]

                if(tl.filter === 'active') {
                    tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                }

                if(tl.filter === 'completed') {
                    tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                }

                return (
                    <TodoList
                        key={tl.id}
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
                )
            })}
        </div>
    );
}

export default App;
