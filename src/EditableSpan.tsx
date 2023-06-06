import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanType = {
    oldTitle: string
    callback: (updateTitle: string) => void
}

const EditableSpan: FC<EditableSpanType> = (props) => {
    const [edit, setEdit] =useState(false)

    const editFoo = () => {
        setEdit(!edit)  // true или false получаем засчет восклицательного знака

        if(edit) {
            addTaskHandler()
        }
    }

    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        props.callback(updateTitle)
    }

    return (
        edit
            ? <input value={updateTitle} onBlur={editFoo} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={editFoo}>{props.oldTitle}</span>
    );
};

// если были бы div, то нужно было бы тернарник было записывать в фигурных скобках, если нет оберток, то пишем без скобок

export default EditableSpan;