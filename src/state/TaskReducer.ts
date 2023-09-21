import {AddTodoListType, RemoveTodoListType, SetTodoListType} from './TodoListReducer';
import {Dispatch} from 'redux';
import {tasksAPI} from '../api/tasksApi';
import {AppRootStateType} from './store';

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

export type UpdateTaskModuleType = Partial<{
    title: string
    description: string
    status: TaskStatuses
    priority: TodoTaskPriority
    startDate: string
    deadline: string
}>

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
            if(state[action.payload.task.todoListId as string].length) {
                return {...state, [action.payload.task.todoListId as string]: [action.payload.task, ...state[action.payload.task.todoListId as string]]}
            } else {
                return {...state, [action.payload.task.todoListId as string]: [action.payload.task]}
            }


        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
            }
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

export const addTaskAC = (task: TasksType) => {
    return {
        type: 'ADD-TASK',
        payload: {task}
    } as const
}

export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateTaskModuleType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {todoListId, taskId, model}
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

export const removeTaskTC = (todoID: string, tasksID: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTasks(todoID, tasksID)
            .then((res) => {
                dispatch(removeTaskAC(todoID, tasksID))
            })
    }
}

export const addTaskTC = (todoID: string, title: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTasks(todoID, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const changeStatusTaskTC = (todoID: string, taskID: string,  status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        // получаем таску из стейта, по id находим нужный массив, пробегаемся по массиву с поисками нужного id таски
        const task = getState().tasks[todoID].find(t => t.id === taskID)

        // если есть таска, то ее собираем
        if(task) {
            const newStatus: Record<number, number> = {
                [TaskStatuses.New] : TaskStatuses.Completed,
                [TaskStatuses.Completed] : TaskStatuses.New,
            }

            const model: UpdateTaskModuleType = {
                title: task.title,
                description: task.description,
                startDate: task.startDate,
                priority: task.priority,
                deadline: task.deadline,
                status: newStatus[task.status]
            }

            tasksAPI.updateTasks(todoID, taskID, model)
                .then((res) => {
                    dispatch(changeStatusTaskAC(todoID, taskID, status))
                })
        }
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskModuleType ) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModuleType = {
            ...domainModel,
        }

        tasksAPI.updateTasks(todolistId, taskId, apiModel)
            .then(res => {
                const action = updateTaskAC(todolistId, taskId, apiModel)
                dispatch(action)
            })
    }
