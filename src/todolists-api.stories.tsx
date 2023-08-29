import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {debug} from 'util';

export default {
    title: 'API'
}

// что бы авторизация на сервере не терялась в другой вкладке
// иначе ошибка 401 (используем как второй параметр при запросе)
const settings = {
    withCredentials: true,

    // ключ брала из личного кабинета
    header: {
        'API-KEY': '38441d44-efce-4f1f-95aa-be1f9fc10993'
    }
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        // Здесь делаем запрос и ответ закидывать в стейт,
        // который в виде строки будем отображать в div-ке

        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

// 2-ой параметр - то что отправляем на сервер
// 3-ий параметр - настройки
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const title = 'JS'

    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    const todoID = 'de07f171-ab5c-4e11-be40-80a65425c4b3'

    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)
    const todoID = '53980526-da03-4ec7-9061-1752f9f124f0'
    const title = 'REACT'

    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`,{title}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

