import {FilterValuesType, TodoListType} from './App';
import {v1} from 'uuid';

// С первым системным экшеном, который редакс диспатчит\отправляет в наши редьюсеры стейт не приходит. Он равен undefined, его нет, потому что жизнь только зарождается, поэтому пишем для state значение по умолчанию
const initialState:TodoListType[] = []

export const TodoListReducer = (state = initialState, action: TsarType): TodoListType[] => {
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
            return state
    }
}

export type RemoveTodoListType = ReturnType<typeof removeTodoListAC>
export type AddTodoListType = ReturnType<typeof addTodoListAC>
type UpdateTodoListType = ReturnType<typeof updateTodoListAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>

type TsarType = RemoveTodoListType | AddTodoListType | UpdateTodoListType | ChangeFilterType

export const removeTodoListAC = (todoListId: string) => {
   return {
       type: 'REMOVE-TODOLIST',
       payload: {todoListId}
   } as const
}

export const addTodoListAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTitle, todoListId: v1()}
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