import {combineReducers, createStore} from 'redux';
import {TodoListReducer} from './TodoListReducer';
import {TasksReducer} from './TaskReducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    todoList: TodoListReducer,
    task: TasksReducer
})

// непосредственно создаём store
export const store = createStore(rootReducer)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store