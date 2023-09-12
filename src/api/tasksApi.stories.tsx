import React, {useEffect, useState} from 'react'
import {tasksAPI} from './tasksApi';
import {TaskStatuses, TodoTaskPriority, UpdateTaskModuleType} from '../state/TaskReducer';

export default {
    title: 'API Tasks'
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoID = '9c50f796-df03-4ed7-947a-d280615b377f'

        tasksAPI.getTasks(todoID)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTasks = () => {

    const [state, setState] = useState<any>(null)

    const todoID = '53980526-da03-4ec7-9061-1752f9f124f0'
    const title = 'JS'

    useEffect(() => {
        tasksAPI.createTasks(todoID, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {

    const [state, setState] = useState<any>(null)
    const todoID = 'de07f171-ab5c-4e11-be40-80a65425c4b3'
    const taskID = ''

    useEffect(() => {
        tasksAPI.deleteTasks(todoID, taskID)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTasks = () => {

    const [state, setState] = useState<any>(null)
    const todoID = '53980526-da03-4ec7-9061-1752f9f124f0'
    const taskID = ''
    const model: UpdateTaskModuleType = {
        title: 'React',
        description: '',
        startDate: '',
        priority: TodoTaskPriority.Hi,
        deadline: '',
        status: TaskStatuses.Completed
    }

    useEffect(() => {
        tasksAPI.updateTasks(todoID, taskID, model)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

