import axios, {AxiosResponse} from 'axios';
import {instance, ResponseType} from './todoListsAPI'
import {TasksType, UpdateTaskModuleType} from '../state/TaskReducer';

type ResponseTaskType = {
    items: TasksType[]
    totalCount: number
    error: string | null
}

export const tasksAPI = {

    getTasks(todoID: string) {
        return instance.get<ResponseTaskType>(`todo-lists/${todoID}/tasks`)
    },

    createTasks(todoID: string, title: string){
        return instance.post<ResponseType<{item: TasksType}>, AxiosResponse<ResponseType<{item: TasksType}>>, {title: string}>(`todo-lists/${todoID}/tasks`,{title})
    },

    deleteTasks(todoID: string, taskID: string){
        return instance.delete<ResponseType>(`todo-lists/${todoID}/tasks/${taskID}`)
    },

    updateTasks(todoID: string, taskID: string, model: UpdateTaskModuleType){
        return instance.put<ResponseType<{ item: TasksType }>, AxiosResponse<ResponseType<{ item: TasksType }>>, UpdateTaskModuleType>(`todo-lists/${todoID}/tasks/${taskID}`, model);
    }
}