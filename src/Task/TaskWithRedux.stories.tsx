import {Meta, StoryObj} from '@storybook/react';
import {TaskWithRedux} from './TaskWithRedux';
import React from 'react';
import {ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {TaskType} from '../state/TaskReducer';


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

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

    return <TaskWithRedux task={task} todolistId={'todolistId1'}/>
}

export const TaskWithReduxStory: Story = {
    // render: args => <TaskWithRedux {...args}/>
    render: args => <TaskComponent/>
}