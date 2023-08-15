import type { Meta, StoryObj } from '@storybook/react';
import AddItemForm, {AddItemFormType} from './AddItemForm';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,

    parameters: {
        layout: 'centered',
    },

    // позволяет сделать вкладку документации
    tags: ['autodocs'],

    // что б задать пропсы не явно или ограничить их значения
    argTypes: {
        callback: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: {
        callback: action('Button clicked inside form')
    }
}

export const AddItemFormErrorStory: Story = {
    render: () => <Component callback={action('Button clicked inside form')}/>
}

// создание компоненты с ошибкой
const Component:FC<AddItemFormType> = ({callback,}) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null >('Title is required') // принимает либо строку, либо null

    const newTask = () => {

        if(title.trim()) {
            callback(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(error) setError(null)

        if(e.key === 'Enter') newTask()
    }

    const buttonStyles = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
        marginLeft: '10px'
    }

    return (
        <div>
            <TextField
                error={!!error}
                id="outlined-basic"
                label={error ? 'Title is required' : 'please type smth... )'  }
                variant="outlined"
                size={'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>

            <Button variant="outlined"
                    color="success"
                    style={buttonStyles}
                    onClick={newTask}>+</Button>
        </div>
    )
}
