import {instance, ResponseType} from './todoListsAPI';
import {AxiosResponse} from 'axios';
import {FormType} from '../features/Login';

type dataMeType = {
    id: number,
    email: string,
    login: string
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<dataMeType>>('auth/me')
    },
    login(data: FormType) {
        return instance.post<null, AxiosResponse<ResponseType<{ userId: number }>>, FormType>('auth/login', data)
    },
    logOut() {
        return instance.delete<ResponseType>('auth/login')
    }
}