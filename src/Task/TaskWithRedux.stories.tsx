import {Meta, StoryObj} from '@storybook/react';
import {TaskWithRedux} from './TaskWithRedux';
import React, {useCallback} from 'react';
import {ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {removeTaskAC, removeTaskTC, TasksType} from '../state/TaskReducer';
import {removeTodoListAC} from '../state/TodoListReducer';


const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,

    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],

    // Добавляем то, что дублируется (это пропсы, которые необходимы компоненте)
    // args: {
    //     task: {id: '757575', title: 'Redux', isDone: false},
    //     todolistId: 'todo1'
    // },
    decorators: [ReduxStoreProviderDecorator]
};

export default meta

type Story = StoryObj<typeof TaskWithRedux>;

const TaskComponent = () => {

    const task = useSelector<AppRootStateType, TasksType>(state => state.tasks['todolistId1'][0])
    const dispatch = useDispatch()

    const removeTask =  useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }, [dispatch])

    return <TaskWithRedux task={task} todolistId={'todolistId1'} removeTask={removeTask}/>
}

export const TaskWithReduxStory: Story = {
    // render: args => <TaskWithRedux {...args}/>
    render: args => <TaskComponent/>
}