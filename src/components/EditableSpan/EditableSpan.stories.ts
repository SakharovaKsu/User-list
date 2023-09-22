import {Meta, StoryObj} from '@storybook/react';
import EditableSpan from './EditableSpan';
import {action} from '@storybook/addon-actions';

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,

    parameters: {
        layout: 'centered',
    },

    // позволяет сделать вкладку документации
    tags: ['autodocs'],

    argTypes: {
        oldTitle: {
            description: 'Start value empty. Add value push button set string.'
        },
        callback: {
            description: 'Value EditableSpan changed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStories: Story = {
    args: {
        oldTitle: 'Title',
        callback: action('callback')
    }
}