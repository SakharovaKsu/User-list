import { Dispatch } from 'redux'
import {SetErrorType, setStatusAC, SetStatusType} from './AppReducer';
import {authAPI} from '../api/authAPI';
import {FormType} from '../features/Login';
import {RESULT_CODE} from './TaskReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: FormType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if(res.data.resultCode === RESULT_CODE.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('idle'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch(e) {
        handleServerNetworkError((e as {message: string}).message, dispatch)
    }
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusType | SetErrorType
