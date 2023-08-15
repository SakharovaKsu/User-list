import {Provider} from 'react-redux';
import {store} from './store';

// Это декоратор для сторибука для компонентов где используется редакс
// Пишем что-то наподобие HOC

export const ReduxStoreProviderDecorator = (fn:() => React.ReactNode) => {
    return <Provider store={store}>{fn()}</Provider>
}