import {Meta, StoryObj} from '@storybook/react';
import {Task} from './Task';
import {TaskType} from '../TodoList';
import {action} from '@storybook/addon-actions';


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,

    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],

    args: {
        removeTask: action('removeTask'),
        changeStatus: action('changeStatus'),
        updateTaskHandler: action('updateTaskHandler')
    },
};

export default meta

type Story = StoryObj<typeof Task>;

export const TaskStory: Story = {
    args: {
        task: {id: 'task', title: 'task', isDone: true},
        removeTask: action('removeTask'),
        changeStatus: action('changeStatus'),
        updateTaskHandler: action('updateTaskHandler')
    }
}

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: 'task', title: 'task', isDone: false},
        removeTask: action('removeTask'),
        changeStatus: action('changeStatus'),
        updateTaskHandler: action('updateTaskHandler')
    }
}