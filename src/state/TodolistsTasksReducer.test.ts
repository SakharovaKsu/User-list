import {addTodoListAC, removeTodoListAC, todoListReducer, TodoListEntityType} from './TodoListReducer';
import {TaskAssocType, tasksReducer, TaskStatuses, TodoTaskPriority} from './TaskReducer';

let startState: TaskAssocType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            },
            {
                id: '2', title: 'JS', description: '', completed: false,
                status: TaskStatuses.Completed, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            },
            {
                id: '3', title: 'React', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: ''
            },
            {
                id: '2', title: 'milk', description: '', completed: false,
                status: TaskStatuses.Completed, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: ''
            },
            {
                id: '3', title: 'tea', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: ''
            }
        ]
    }
})

test('ids should be equals', () => {
    const startTasksState: TaskAssocType = {}
    const startTodolistsState: TodoListEntityType[] = []

    const action = addTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todoListId)
    expect(idFromTodolists).toBe(action.payload.todoListId)
})

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
