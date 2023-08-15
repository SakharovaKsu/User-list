import {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {TaskWithRedux} from './TaskWithRedux';
import {TaskType} from '../TodoList';
import {Provider} from 'react-redux';
import {store} from '../state/store';
import React from 'react';
import {ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator';


const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,

    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],

    // Добавляем то, что дублируется (это пропсы, которые необходимы компоненте)
    args: {
        task: {id: '757575', title: 'Redux', isDone: false},
        todolistId: 'todo1'
    },
    decorators: [ReduxStoreProviderDecorator]
};

export default meta

type Story = StoryObj<typeof TaskWithRedux>;

export const TaskWithReduxStory: Story = {
    render: args => <TaskWithRedux {...args}/>
}
//
// export const TaskIsNotDoneStory: Story = {
//     args: {
//         task: {id: 'task', title: 'task', isDone: false},
//     }
// }