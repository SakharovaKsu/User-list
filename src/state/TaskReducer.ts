import {v1} from 'uuid';
import {AddTodoListType, RemoveTodoListType} from './TodoListReducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskAssocType = {
    [key: string]: TaskType[]
}

const initialState: TaskAssocType = {}

export const TasksReducer = (state = initialState, action: tsarType): TaskAssocType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
            ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}

            if(state[action.payload.todoListId]) {
                 return {...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]}
            } else {
                 return {...state, [action.payload.todoListId]: [newTask]}
            }

            // {...tasks} - копируем весь таск, далее копируем массив тасок по id, в эту копию добавляем новую таску (newTask) и копируем ...tasks[todoListId]
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.taskId ? {...t,
                        title: action.payload.updateTitle} : t)}
        }
        case 'CHANGE-STATUS-TASK': {
            // tasks.map(el => el.id === taskID ? {...el, isDone: checkedValue} : el) // делаем копию через map (массива и всех объектов), ищем id (а можем и не найти, то ничего не возвращает), если нашла - копируем объект (...el). и перезаписываем isDone: checkedValue. Он перезапишется так как старое значение будет совпадать по названию с новым

            return {...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.isDone} : t)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todoListId] : []}
        }
        case 'REMOVE-TODOLIST': {
            // копируем, что б не нарушать принцип иммутабельности и удаляем стайт
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoListId]
            return stateCopy
        }
        default:
            return state
    }
}

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTasksType = ReturnType<typeof addTaskAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>
type ChangeStatusTaskType = ReturnType<typeof changeStatusTaskAC>

type tsarType = RemoveTaskType | AddTasksType | UpdateTaskType | ChangeStatusTaskType | AddTodoListType | RemoveTodoListType

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todoListId, taskId}
    } as const
}

export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todoListId, title}
    } as const
}

export const updateTaskAC = (todoListId: string, taskId: string, updateTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {todoListId, taskId, updateTitle}
    } as const
}

export const changeStatusTaskAC = (todoListId: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {todoListId, taskID, isDone}
    } as const
}
