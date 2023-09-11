import {v1} from 'uuid';
import {
    addTaskAC,
    changeStatusTaskAC,
    removeTaskAC,
    TaskAssocType,
    TasksReducer,
    TaskStatuses,
    TodoTaskPriority,
    updateTaskAC
} from './TaskReducer';
import {addTodoListAC} from './TodoListReducer';

let defTasks: TaskAssocType

beforeEach(() => {
    defTasks = {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', description: '', completed: false,
                status: TaskStatuses.Completed, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'JS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'React', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'TS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'HTML&CSS', description: '', completed: false,
                status: TaskStatuses.Completed, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'JS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'React', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'TS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: ''
            }
        ]
    }
})

test ('removing a task from the list', () => {

    const taskID = defTasks['todolistId1'][0].id

    const action = removeTaskAC('todolistId1', taskID)
    const endTask = TasksReducer(defTasks, action)

    expect(endTask['todolistId1'].length).toBe(3)
    expect(endTask['todolistId1'][0].title).toBe('JS')
})

// test ('there should be a new task', () => {
//
//     const taskTitle = 'Vue'
//
//     const action = addTaskAC('todolistId1', taskTitle)
//     const endTask = TasksReducer(defTasks, action)
//
//     expect(endTask['todolistId1'].length).toBe(5)
//     expect(endTask['todolistId1'][0].title).toBe('Vue')
//     expect(endTask['todolistId1'][0].id).toBeDefined()
// })

test ('should change the title in the task', () => {

    const taskID = defTasks['todolistId1'][0].id

    const action = updateTaskAC('todolistId1', taskID, 'CSS')
    const endTask = TasksReducer(defTasks, action)

    expect(endTask['todolistId1'][0].title).toBe('CSS')
    expect(endTask['todolistId1'][0].title).not.toBe(defTasks['todolistId1'][0].title)
})

test ('should change the status in tasks', () => {

    const taskID = defTasks['todolistId1'][0].id

    const action = changeStatusTaskAC('todolistId1', taskID, TaskStatuses.New)
    const endTask = TasksReducer(defTasks, action)

    expect(endTask['todolistId1'][0].status).toBe(TaskStatuses.New)
    expect(endTask['todolistId1'][0].status).not.toBe(defTasks['todolistId1'][0].status)
})

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC('new todoList')

    const endState = TasksReducer(defTasks, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
