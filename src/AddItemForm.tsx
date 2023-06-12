import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from "./TodoList.module.css";
import Button from "@mui/material/Button";

type AddItemFormType = {
    callback: (title: string) => void
}

export const AddItemForm:FC<AddItemFormType> = ({callback,}) => {
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
        if(e.key === 'Enter') newTask()
    }

    const buttonStyles = {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        backgroundColor: '#ffff73',
        borderColor: '#7109aa',
        color: '#7109aa'
    }

    return (
        <div>
            <div>
                <input className={error ? s.error : ''}
                    // в value добавляем title, в котором хранится наше значение в стейте (25 строка)
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <Button variant="outlined"
                        style={buttonStyles}
                        onClick={newTask}>+</Button>
            </div>

            {/*если error ровняется true, то показываем ошибку*/}
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
};

export default AddItemForm;