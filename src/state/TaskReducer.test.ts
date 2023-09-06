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
    const defTasks = {
        ['todoListId1']: [
            {
                id: v1(), title: 'JS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'React', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'TS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''
            }
        ],
        ['todoListId2']: [
            {
                id: v1(), title: 'HTML&CSS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'JS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'React', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'TS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''
            }
        ]
    }
})

test ('removing a task from the list', () => {

    const taskID = defTasks['todoListId1'][0].id

    const action = removeTaskAC('todoListId1', taskID)
    const endTask = TasksReducer(defTasks, action)

    expect(endTask['todoListId1'].length).toBe(3)
    expect(endTask['todoListId1'][0].title).toBe('JS')
})

test ('there should be a new task', () => {

    const taskTitle = 'Vue'

    const action = addTaskAC('todoListId1', taskTitle)
    const endTask = TasksReducer(defTasks, action)

    expect(endTask['todoListId1'].length).toBe(5)
    expect(endTask['todoListId2'].length).toBe(4)
    expect(endTask['todoListId1'][0].title).toBe('Vue')
    expect(endTask['todoListId1'][0].id).toBeDefined()
})

test ('should change the title in the task', () => {

    const taskID = defTasks['todoListId1'][0].id

    const action = updateTaskAC('todoListId1', taskID, 'CSS')
    const endTask = TasksReducer(defTasks, action)

    expect(endTask['todoListId1'][0].title).toBe('CSS')
    expect(endTask['todoListId1'][0].title).not.toBe(defTasks['todoListId1'][0].title)
})

test ('should change the status in tasks', () => {

    const taskID = defTasks['todoListId1'][0].id

    const action = changeStatusTaskAC('todoListId1', taskID, TaskStatuses.New)
    const endTask = TasksReducer(defTasks, action)

    expect(endTask['todoListId1'][0].status).toBe(TaskStatuses.New)
    expect(endTask['todoListId1'][0].status).not.toBe(defTasks['todoListId1'][0].status)
})

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC('new todoList')

    const endState = TasksReducer(defTasks, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todoListId1' && k !== 'todoListId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
