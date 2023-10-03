import {instance, ResponseType} from './todoListsAPI';
import {AxiosResponse} from 'axios';
import {FormType} from '../features/Login';

export const authAPI = {
    login(data: FormType) {
        return instance.post<null, AxiosResponse<ResponseType<{ userId: number }>>, FormType>('auth/login', data)
    }
}