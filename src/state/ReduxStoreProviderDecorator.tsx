import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from './store';
import {combineReducers,  legacy_createStore} from "redux";
import {v1} from "uuid";
import {TasksReducer} from './TaskReducer';
import {TodoListReducer} from './TodoListReducer';

// Это декоратор для сторибука для компонентов где используется редакс
// Пишем что-то наподобие HOC

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: TodoListReducer
})

const initialGlobalState: AppRootStateType = {
    todoList: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (fn:() => React.ReactNode) => {
    return <Provider store={storyBookStore}>{fn()}</Provider>
}

// возникает ошибка когда добавляю вместо store - storyBookStore
