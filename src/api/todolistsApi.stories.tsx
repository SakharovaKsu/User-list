import React, {useEffect, useState} from 'react'
import {todoListsAPI} from './todoListsAPI';

export default {
    title: 'API Todo List'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        // Здесь делаем запрос и ответ закидывать в стейт,
        // который в виде строки будем отображать в div-ке

        todoListsAPI.getTodoLists()
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
        todoListsAPI.createTodolist(title)
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
        todoListsAPI.deleteTodolist(todoID)
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
        todoListsAPI.updateTodolistTitle(todoID, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

