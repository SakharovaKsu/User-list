import {v1} from 'uuid';
import {AddTodoListType, RemoveTodoListType, setTodoListAC, SetTodoListType} from './TodoListReducer';
import {Dispatch} from 'redux';
import {todoListsAPI} from '../api/todoListsAPI';
import {tasksAPI} from '../api/tasksApi';

// Для определения статуса таски, выполнена или нет
export enum TaskStatuses {
    New = 0, // Не выполнена
    InProgress = 1,
    Completed = 2, // Выполнена таска
    Draft = 3
}

export enum TodoTaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TodoTaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId?: string
    order?: number
    addedDate?: string
}

export type TaskAssocType = {
    [key: string]: TasksType[]
}

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTasksType = ReturnType<typeof addTaskAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>
type ChangeStatusTaskType = ReturnType<typeof changeStatusTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>

type tsarType = RemoveTaskType | AddTasksType | UpdateTaskType | ChangeStatusTaskType | AddTodoListType | RemoveTodoListType | SetTodoListType | SetTasksType

const initialState: TaskAssocType = {}

export const TasksReducer = (state = initialState, action: tsarType): TaskAssocType => {
    switch (action.type) {
        // возвращаем таски, которые наполнены на всю длину todoList
        // когда в компоненте TodoList мэпом пробежимся по таскам, которых может и не быть, то не появится undefined, так как здесь мы подготовили заготовку для этого
        case 'SET-TODOLIST': {
            const copyState =  {...state}

            // через forEach пробегаем по всем туду листам и добавляем пустой массив тасок
            action.payload.todoLists.forEach((el) => {
                copyState[el.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            return {...state, [action.payload.todoID]: action.payload.tasks}
        }
        case 'REMOVE-TASK': {
            return {
            ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask = {
                id: v1(),
                title: action.payload.title,
                description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: 1,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            }

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
                    .map(t => t.id === action.payload.taskID ? {...t, status: action.payload.status} : t)}
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

export const changeStatusTaskAC = (todoListId: string, taskID: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {todoListId, taskID, status}
    } as const
}

export const setTasksAC = (todoID: string, tasks: TasksType[]) => {
   return {
       type: 'SET-TASKS',
       payload: {todoID, tasks}
   } as const
}

export const getTasksTC = (todoID: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todoID)
            .then((res) => {
                dispatch(setTasksAC(todoID, res.data.items))
            })
    }
}