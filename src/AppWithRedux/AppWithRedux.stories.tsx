import {Meta, Story} from '@storybook/react';
import AppWithRedux from './AppWithRedux';
import React from 'react';
import { ReduxStoreProviderDecorator } from '../state/ReduxStoreProviderDecorator';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta: Meta = {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    // позволяет сделать вкладку документации
    parameters: {
        docs: {
            page: null,
        },
    },
    decorators: [ReduxStoreProviderDecorator, withRouter],
};

export default meta;

export const AppWithReduxStories: Story = () => <AppWithRedux />;