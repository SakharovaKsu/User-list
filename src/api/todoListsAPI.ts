import axios from 'axios';

export type TodoListsType = {
    id: string
    title: string
    addedData: string
    order: number
}

// в дженерик T (<T>) может прийти пустой объект или TodoListsType, или еще что.
// То что приходит уточняем ниже в типизации (<ResponseType<{}>>)
type ResponseType<T> = {
    resultCode: number
    messages: Array<string>,
    data: T
}

// что бы авторизация на сервере не терялась в другой вкладке - добавляем withCredentials: true
// иначе ошибка 401 (используем как второй параметр при запросе)

// В baseURL прописываем путь, который дублируется везде (для рефакторинга)

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
        // В get придет <Array<TodoListsType>> (массив туду листов)
        return instance.get<Array<TodoListsType>>('todo-lists')
    },

    createTodolist(title: string){
        return instance.post<ResponseType<{item: TodoListsType}>>('todo-lists',{title})
    },

    deleteTodolist(todoID: string){
        return instance.delete<ResponseType<{}>>(`todo-lists/${todoID}`)
    },

    updateTodolistTitle(todoID: string, title: string){
        return instance.put<ResponseType<{}>>(`todo-lists/${todoID}`,{title})
    }
}