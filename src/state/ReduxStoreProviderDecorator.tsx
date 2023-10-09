import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, RootReducerType} from './store';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {v1} from "uuid";
import {tasksReducer, TaskStatuses, TodoTaskPriority} from './TaskReducer';
import {todoListReducer} from './TodoListReducer';
import {appReducer} from './AppReducer';
import {authReducer} from './authReducer';
import thunkMiddleware from 'redux-thunk';

// Это декоратор для сторибука для компонентов где используется редакс
// Пишем что-то наподобие HOC

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: 'todoListId1', title: 'What to learn', filter: 'all',
            addedData: '', order: 0, entityStatus: 'idle'},
        {id: 'todoListId2', title: 'What to buy', filter: 'all',
            addedData: '', order: 1, entityStatus: 'idle'}
    ] ,
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'JS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'React', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Low, startDate: '',
                deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''
            },
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'HTML&CSS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'JS', description: '', completed: false,
                status: TaskStatuses.New, priority: TodoTaskPriority.Urgently, startDate: '',
                deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''
            }
        ]
    },
    app: {status: 'loading', error: null, isInitialized: true},
    auth: {isLoggedIn: true}
};

// export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)
export const storyBookStore = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (fn:() => React.ReactNode) => {
    return <Provider store={storyBookStore}>{fn()}</Provider>
}

