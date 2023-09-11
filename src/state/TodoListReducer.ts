import {v1} from 'uuid';
import {todoListsAPI} from '../api/todoListsAPI';
import {Dispatch} from 'redux';

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

type TsarType = RemoveTodoListType | AddTodoListType | UpdateTodoListType | ChangeFilterType | SetTodoListType

// С первым системным экшеном, который редакс диспатчит\отправляет в наши редьюсеры стейт не приходит. Он равен undefined, его нет, потому что жизнь только зарождается, поэтому пишем для state значение по умолчанию
const initialState:TodoListEntityType[] = []

export const TodoListReducer = (state = initialState, action: TsarType): TodoListEntityType[] => {
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

export const setTodoListAC = (todoLists: TodoListsType[]) => {
    return {
        type: 'SET-TODOLIST',
        payload: {todoLists}
    } as const
}

// Thunk - функция, которая принимает dispatch, getState
// Предназначена для того, чтобы внутри нее делать побочные эффекты (запросы на сервер) и диспатчить action или другие thunk.

export const getTodoListThunk = (dispatch: Dispatch) => {
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoListAC(res.data))
        })
}