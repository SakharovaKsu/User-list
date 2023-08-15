import {Meta, StoryObj} from '@storybook/react';
import AppWithRedux from './AppWithRedux';
import React from 'react';
import {ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator';

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,

    // позволяет сделать вкладку документации
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStories: Story = {
    render: args =>  <AppWithRedux/>
}