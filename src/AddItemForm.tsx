import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import s from './TodoList.module.css';

type AddItemFormType = {
    callback: (title: string) => void
}

export const AddItemForm:FC<AddItemFormType> = memo( ({callback,}) => {
    console.log('AddItemForm')

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null >('') // принимает либо строку, либо null

    const newTask = () => {
        // если после trim остается хоть один знак, то добавляй новую таску, если же знаков нет, то не добавляешь
        // trim убирает не нужные пробелы
        if(title.trim()) {
            callback(title.trim()) // добавляем новую таску
            setTitle('') // делаем пустую строку по умолчанию после добавления новой таски
        } else {
            setError('Title is required') // ошибка если ничего не набрано в инпуте
        }
    }

    // Получаем значение из инпута и добавляем в setInput
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null) // если начали печатать в инпуте, то ошибка переходит уже в false
        setTitle(e.currentTarget.value)
        // обращаемся к инпуту через событие e.currentTarget к его значению, которое хочет напечататься и отправляем его в стейт
    }

    // Добавляем новую таску при нажатии на Enter
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        // Мы на каждое впечатывание символа вызываем setError(null), и это путает React.
        // Поэтому делаем setError(null) только, если текущая error !== null
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
            <div>
                {/* !!error - превращаем строку в true, а если один !, то это уже false */}
                <TextField
                    error={!!error}
                    id="outlined-basic"
                    label={error ? 'Title is required' : 'please type smth... )'  }
                    variant="outlined"
                    size={'small'}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}/>
                {/*в value добавляем title, в котором хранится наше значение в стейте (25 строка)*/}
                <Button variant="outlined"
                        color="success"
                        style={buttonStyles}
                        onClick={newTask}>+</Button>
            </div>

            {/*если error ровняется true, то показываем ошибку*/}
            {/*{error && <div className={s.errorMessage}>{error}</div>}*/}
        </div>
    )
})

export default AddItemForm;