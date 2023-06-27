import {FilterValuesType, TodoListType} from './App';

export const TodoListReducer = (state: TodoListType[], action: TsarType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todoListId)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodoListType = {id: action.payload.todoListId, title: action.payload.newTitle, filter: 'all'}
            return [...state, newTodo]
        }
        case 'UPDATE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.updateTitle} : el)
        }
        case 'CHANGE-FILTER-TODOLIST': {
            // копируем полностью объект и после этого вносим изменения
            return state.map(el => el.id === action.payload.todoListId ? {...el, filter: action.payload.value} : el)
        }
        default:
            throw new Error('I dont understand this type')
    }
}

type RemoveTodoListType = ReturnType<typeof removeTodoListAC>
type AddTodoListType = ReturnType<typeof addTodoListAC>
type UpdateTodoListType = ReturnType<typeof updateTodoListAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>

type TsarType = RemoveTodoListType | AddTodoListType | UpdateTodoListType | ChangeFilterType

export const removeTodoListAC = (todoListId: string) => {
   return {
       type: 'REMOVE-TODOLIST',
       payload: {todoListId}
   } as const
}

export const addTodoListAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todoListId, newTitle}
    } as const
}

export const updateTodoListAC = (todoListId: string, updateTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {todoListId, updateTitle}
    } as const
}

export const changeFilterAC = (todoListId: string, value:FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER-TODOLIST',
        payload: {todoListId, value}
    } as const
}