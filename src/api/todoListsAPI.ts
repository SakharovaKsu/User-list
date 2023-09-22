import axios, {AxiosResponse} from 'axios';
import {TodoListsType} from '../state/TodoListReducer';

// в дженерик T (<T>) может прийти пустой объект или TodoListsType, или еще что.
// То что приходит уточняем ниже в типизации (<ResponseType<{}>>)
// T = {} Ставим пустой объект по умолчанию
export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: string[]
    data: T
}

// что бы авторизация на сервере не терялась в другой вкладке - добавляем withCredentials: true
// иначе ошибка 401 (используем как второй параметр при запросе)

// В baseURL прописываем путь, который дублируется везде (для рефакторинга).
// create - это метод в библиотеке, который позволяет создавать новые экземпляры Axios с настраиваемой конфигурацией.

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,

    // ключ брала из личного кабинета
    headers: {
        'API-KEY': '38441d44-efce-4f1f-95aa-be1f9fc10993'
    }
})

export const todoListsAPI = {

    getTodoLists() {
        // В get придет <TodoListsType[]> (массив туду листов)
        return instance.get<TodoListsType[]>('todo-lists')
    },

    createTodolist(title: string){

        // если 1ым параметром передам null, то ничего не сломается, потому что 1 аргумент игнорируется и не важно что туда передаем, так как используется 2-ой тип (AxiosResponse)
        // если оставляю один тип, то на него и ориентируется, но зачем передавать три типа? 3-ий тип типизирует то, что мы передаем на бэкенд. И что бы он увидел (3ий аргумент) необходимо передать два типа
        return instance.post<ResponseType<{item: TodoListsType}>, AxiosResponse<ResponseType<{item: TodoListsType}>>, {title: string}>('todo-lists',{title})
    },

    deleteTodolist(todoID: string){
        return instance.delete<ResponseType>(`todo-lists/${todoID}`)
    },

    updateTodolistTitle(todoID: string, title: string){
        return instance.put<ResponseType, AxiosResponse<ResponseType>, {title: string}>(`todo-lists/${todoID}`,{title})
    }
}