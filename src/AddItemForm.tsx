import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from "./TodoList.module.css";

type AddItemFormType = {
    addTask: (todoListId: string, title: string) => void
    todoListId: string
}

export const AddItemForm:FC<AddItemFormType> = ({addTask, todoListId}) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null >('') // принимает либо строку, либо null

    const newTask = () => {
        // если после trim остается хоть один знак, то добавляй новую таску, если же знаков нет, то не добавляешь
        // trim убирает не нужные пробелы
        if(title.trim()) {
            addTask(todoListId, title.trim()) // добавляем новую таску
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

    return (
        <div>
            <div>
                <input className={error ? s.error : ''}
                    // в value добавляем title, в котором хранится наше значение в стейте (25 строка)
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={newTask}>+</button>
            </div>

            {/*если error ровняется true, то показываем ошибку*/}
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
};

export default AddItemForm;