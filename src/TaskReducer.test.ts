import {v1} from 'uuid';
import {addTaskAC, changeStatusTaskAC, removeTaskAC, TasksReducer, updateTaskAC} from './TaskReducer';
import {TaskAssocType} from './App';
import {addTodoListAC} from './TodoListReducer';

test ('removing a task from the list', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const defTasks: TaskAssocType = {
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

    const taskID = defTasks[todoListId1][0].id

    const action = removeTaskAC(todoListId1, taskID)
    const endTask = TasksReducer(defTasks, action)

    expect(endTask[todoListId1].length).toBe(3)
    expect(endTask[todoListId1][0].title).toBe('JS')
})

test ('there should be a new task', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const defTasks: TaskAssocType = {
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

    const taskTitle = 'Vue'

    const action = addTaskAC(todoListId1, taskTitle)
    const endTask = TasksReducer(defTasks, action)

    expect(endTask[todoListId1].length).toBe(5)
    expect(endTask[todoListId2].length).toBe(4)
    expect(endTask[todoListId1][0].title).toBe('Vue')
    expect(endTask[todoListId1][0].isDone).toBe(false)
    expect(endTask[todoListId1][0].id).toBeDefined()
})

test ('should change the title in the task', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const defTasks: TaskAssocType = {
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

    const taskID = defTasks[todoListId1][0].id

    const action = updateTaskAC(todoListId1, taskID, 'CSS')
    const endTask = TasksReducer(defTasks, action)

    expect(endTask[todoListId1][0].title).toBe('CSS')
    expect(endTask[todoListId1][0].title).not.toBe(defTasks[todoListId1][0].title)
})

test ('should change the status in tasks', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const defTasks: TaskAssocType = {
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

    const taskID = defTasks[todoListId1][0].id

    const action = changeStatusTaskAC(todoListId1, taskID, false)
    const endTask = TasksReducer(defTasks, action)

    expect(endTask[todoListId1][0].isDone).toBe(false)
    expect(endTask[todoListId1][0].isDone).not.toBe(defTasks[todoListId1][0].isDone)
})

test('new array should be added when new todolist is added', () => {
    const startState: TaskAssocType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodoListAC('new todolist')

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})