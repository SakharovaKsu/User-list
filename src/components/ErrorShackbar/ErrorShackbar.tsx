import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {useAppSelector} from '../../state/store';
import {useDispatch} from 'react-redux';
import {setErrorAC} from '../../state/AppReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {

    const dispatch = useDispatch()
    const error = useAppSelector(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        // зануляем ошибку, что бы алерт исчез
        dispatch(setErrorAC(null))
    }

    // !! - преобразуем стрингу в булева с помощью восклицательных знаков
    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}