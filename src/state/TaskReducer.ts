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
type SetTasksType = ReturnType<typeof setTasksAC>

type tsarType = RemoveTaskType | AddTasksType | UpdateTaskType | AddTodoListType | RemoveTodoListType | SetTodoListType | SetTasksType

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

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskModuleType ) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const newStatus: Record<number, number> = {
            [TaskStatuses.New] : TaskStatuses.Completed,
            [TaskStatuses.Completed] : TaskStatuses.New,
        }

        const apiModel: UpdateTaskModuleType = {
            ...domainModel,
            title: task.title,
            description: task.description,
            startDate: task.startDate,
            priority: task.priority,
            deadline: task.deadline,
            status: newStatus[task.status]
        }

        tasksAPI.updateTasks(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, apiModel))
            })
    }
