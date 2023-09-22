import {v1} from 'uuid';
import {todoListsAPI} from '../api/todoListsAPI';
import {Dispatch} from 'redux';
import {setStatusAC, SetStatusType} from './AppReducer';

export type FilterValuesType = 'all' | 'active' | 'completed'
type FilterType = {
    filter: FilterValuesType
}

export type TodoListsType = {
    id: string
    title: string
    addedData: string
    order: number
}

export type TodoListEntityType = TodoListsType & FilterType

export type RemoveTodoListType = ReturnType<typeof removeTodoListAC>
export type AddTodoListType = ReturnType<typeof addTodoListAC>
type UpdateTodoListType = ReturnType<typeof updateTodoListAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>
export type SetTodoListType = ReturnType<typeof setTodoListAC>

type TsarType = RemoveTodoListType | AddTodoListType | UpdateTodoListType | ChangeFilterType | SetTodoListType | SetStatusType

// С первым системным экшеном, который редакс диспатчит\отправляет в наши редьюсеры стейт не приходит. Он равен undefined, его нет, потому что жизнь только зарождается, поэтому пишем для state значение по умолчанию
const initialState:TodoListEntityType[] = []

export const todoListReducer = (state = initialState, action: TsarType): TodoListEntityType[] => {
    switch (action.type) {
        case 'SET-TODOLIST': {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todoListId)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodoListEntityType = {id: action.payload.todoListId, title: action.payload.newTitle, filter: 'all', addedData: '', order: 0}
            return [newTodo, ...state]
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

export const removeTodoListAC = (todoListId: string) => ({type: 'REMOVE-TODOLIST', payload: {todoListId}} as const)
export const addTodoListAC = (newTitle: string) => ({type: 'ADD-TODOLIST', payload: {newTitle, todoListId: v1()}} as const)
export const updateTodoListAC = (todoListId: string, updateTitle: string) => ({type: 'UPDATE-TODOLIST-TITLE', payload: {todoListId, updateTitle}} as const)
export const changeFilterAC = (todoListId: string, value:FilterValuesType) => ({type: 'CHANGE-FILTER-TODOLIST', payload: {todoListId, value}} as const)
export const setTodoListAC = (todoLists: TodoListsType[]) => ({type: 'SET-TODOLIST', payload: {todoLists}} as const)

// Thunk - функция, которая принимает dispatch, getState
// Предназначена для того, чтобы внутри нее делать побочные эффекты (запросы на сервер) и диспатчить action или другие thunk.

export const getTodoListTC = () => {
    return (dispatch: Dispatch<TsarType>) => {
        dispatch(setStatusAC('loading'))
        todoListsAPI.getTodoLists()
            .then((res) => {
                dispatch(setTodoListAC(res.data))
            })
            .catch(() => {})
            .finally(() => {
                dispatch(setStatusAC('idle'))
            })
    }
}

export const removeTodoListTC = (todoID: string) => {
    return (dispatch: Dispatch<TsarType>) => {
        dispatch(setStatusAC('loading'))
        todoListsAPI.deleteTodolist(todoID)
            .then((res) => {
                dispatch(removeTodoListAC(todoID))
                dispatch(setStatusAC('idle'))
            })
            .catch(() => {})
    }
}

export const addTodoListTC = (newTitle: string) => {
    return (dispatch: Dispatch<TsarType>) => {
        dispatch(setStatusAC('loading'))
        todoListsAPI.createTodolist(newTitle)
            .then(res => {
                dispatch(addTodoListAC(newTitle))
                dispatch(setStatusAC('idle'))
            })
            .catch(() => {})
    }
}

export const updateTodoLostTC = (todoID: string, updateTitle: string) => {
    return (dispatch: Dispatch<TsarType>) => {
        dispatch(setStatusAC('loading'))
        todoListsAPI.updateTodolistTitle(todoID, updateTitle)
            .then(res => {
                dispatch(updateTodoListAC(todoID, updateTitle))
                dispatch(setStatusAC('idle'))
            })
            .catch(() => {})
    }
}