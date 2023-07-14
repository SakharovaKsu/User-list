import {addTodoListAC, TodoListReducer} from './TodoListReducer';
import {TaskAssocType, TodoListType} from './App';
import {TasksReducer} from './TaskReducer';

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
