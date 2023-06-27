import {TaskAssocType} from './App';
import {v1} from 'uuid';

export const TasksReducer = (state: TaskAssocType, action: tsarType): TaskAssocType => {
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
                // setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
            } else {
                // setTasks({...tasks, [todoListId]: [newTask]})
            }

            return state
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.taskId ? {...t,
                        title: action.payload.updateTitle} : t)}
        }
        case 'CHANGE-STATUS-TASK':
            // tasks.map(el => el.id === taskID ? {...el, isDone: checkedValue} : el) // делаем копию через map (массива и всех объектов), ищем id (а можем и не найти, то ничего не возвращает), если нашла - копируем объект (...el). и перезаписываем isDone: checkedValue. Он перезапишется так как старое значение будет совпадать по названию с новым

            return {...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.isDone} : t)}
        }
        default:
            throw new Error('I dont understand this type')
    }
}

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTasksType = ReturnType<typeof addTaskAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>
type ChangeStatusTaskType = ReturnType<typeof changeStatusTaskAC>

type tsarType = RemoveTaskType | AddTasksType | UpdateTaskType | ChangeStatusTaskType

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