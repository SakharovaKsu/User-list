import {v1} from 'uuid';
import {addTodoListAC, changeFilterAC, removeTodoListAC, TodoListReducer, updateTodoListAC} from './TodoListReducer';
import {FilterValuesType, TodoListType} from './App';

test ('correct todolist should be removed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const defTodo: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const action = removeTodoListAC(todoListId1)
    const endState = TodoListReducer(defTodo, action)

    expect(endState).toEqual([
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]);
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test ('correct todolist must be added', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const todoListId3 = v1()

    const defTodo: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const action = addTodoListAC(todoListId3, 'List of books')
    const endState = TodoListReducer(defTodo, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('List of books')
})

test ('the title of the to-do list should be updated', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const defTodo: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const newTodoListTitle = 'List of books'

    const action = updateTodoListAC(todoListId2, newTodoListTitle)
    const endState = TodoListReducer(defTodo, action)

    expect(endState[1].title).toBe('List of books')
})

test ('The filter in the right-hand list should change', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const defTodo: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const newTodoListFilter: FilterValuesType = 'completed'

    const action = changeFilterAC(todoListId2, newTodoListFilter)
    const endState = TodoListReducer(defTodo, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})