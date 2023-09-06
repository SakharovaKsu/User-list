import axios from 'axios';
import {ResponseType} from './todoListsAPI'
import {TasksType} from '../state/TaskReducer';

type ResponseTaskType = {
    items: TasksType[]
    totalCount: number
    error: string | null
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,

    // ключ брала из личного кабинета
    headers: {
        'API-KEY': '38441d44-efce-4f1f-95aa-be1f9fc10993'
    }
})

export const tasksAPI = {

    getTasks(todoID: string) {
        return instance.get<ResponseTaskType>(`todo-lists/${todoID}/tasks`)
    },

    createTasks(todoID: string, title: string){
        return instance.post<ResponseType<{ item: TasksType[] }>>(`todo-lists/${todoID}/tasks`,{title})
    },

    deleteTasks(todoID: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todoID}/tasks/${taskId}`)
    },

    updateTasks(todoID: string, taskId: string, title: string){
        return instance.put<TasksType>(`todo-lists/${todoID}/tasks/${taskId}`,{title})
    }
}