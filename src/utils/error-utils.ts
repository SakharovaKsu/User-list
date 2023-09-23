import { Dispatch } from 'redux'
import {ResponseType} from '../api/todoListsAPI';
import {setErrorAC, SetErrorType, setStatusAC, SetStatusType} from '../state/AppReducer';

// выносим дублирующий код из санок

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error))
    dispatch(setStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorType | SetStatusType>
