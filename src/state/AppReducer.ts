export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    // происходит ли сейчас взаимодействие с сервером
    status: 'loading' as RequestStatusType,
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: null as null | string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case 'SET-IS-INITIALIZED': {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({type:'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type:'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'SET-IS-INITIALIZED', isInitialized} as const)

export type SetStatusType = ReturnType<typeof setStatusAC>
export type SetErrorType = ReturnType<typeof setErrorAC>
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>

type ActionsType = SetStatusType | SetErrorType | SetIsInitializedType