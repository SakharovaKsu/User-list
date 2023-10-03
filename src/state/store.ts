import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todoListReducer} from './TodoListReducer';
import {tasksReducer} from './TaskReducer';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {appReducer} from './AppReducer';
import {authReducer} from './authReducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

// непосредственно создаём store
// Thunk middleware (thunkMiddleware) позволяет диспатчить и функции и объекты.
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

// если не будет использовать thunkMiddleware - увидим ошибку: Error: Actions must be plain objects. Use custom middleware for async actions.​
// Redux ругается, что можем диспатчить только plain (простые) объекты-экшены… если хотите чего покруче, то юзайте промежуточные перехватчики middlew

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// unknown используется для переменных, значение которых может быть неизвестно на момент написания кода. Этот тип данных похож на тип any, но более строгий, так как он не позволяет присваивать значения переменным других типов без явного приведения типов.
// AnyAction - любые action
type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// типизируем диспач - будешь получать не только any, но еще и thunk
// здесь useDispatch не вызываем, только типизируем, вызываем в app где используем уже
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store