import {addTodoListAC, removeTodoListAC, TodoListReducer, TodoListType} from './TodoListReducer';
import {TaskAssocType, TasksReducer} from './TaskReducer';

let startState: TaskAssocType

beforeEach(() => {
    startState = {
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
})

test('ids should be equals', () => {
    const startTasksState: TaskAssocType = {}
    const startTodolistsState: TodoListType[] = []

    const action = addTodoListAC('new todolist')

    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistsState = TodoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todoListId)
    expect(idFromTodolists).toBe(action.payload.todoListId)
})

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC('todolistId2')

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
