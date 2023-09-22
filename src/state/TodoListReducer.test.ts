import {
    addTodoListAC,
    changeFilterAC, FilterValuesType,
    removeTodoListAC,
    todoListReducer,
    TodoListEntityType,
    updateTodoListAC
} from './TodoListReducer';

let defTodo: TodoListEntityType[]

beforeEach(() => {
    defTodo = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all',
            addedData: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all',
            addedData: '', order: 1, entityStatus: 'idle'}
    ]
})

test ('correct todolist should be removed', () => {

    const action = removeTodoListAC('todolistId2')
    const endState = todoListReducer(defTodo, action)

    expect(endState).toEqual([
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedData: "", order: 0,}
    ]);
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('todolistId1')
})

test ('correct todolist must be added', () => {

    const action = addTodoListAC('List of books')
    const endState = todoListReducer([], action)

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('List of books')
})

test ('the title of the to-do list should be updated', () => {

    const newTodoListTitle = 'List of books'

    const action = updateTodoListAC('todolistId2', newTodoListTitle)
    const endState = todoListReducer(defTodo, action)

    expect(endState[1].title).toBe('List of books')
})

test ('The filter in the right-hand list should change', () => {

    const newTodoListFilter: FilterValuesType = 'completed'

    const action = changeFilterAC('todolistId2', newTodoListFilter)
    const endState = todoListReducer(defTodo, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})