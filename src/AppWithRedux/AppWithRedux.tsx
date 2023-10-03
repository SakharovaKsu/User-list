import React, {useEffect} from 'react';
import '../App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {TasksType} from '../state/TaskReducer';
import {useAppDispatch, useAppSelector} from '../state/store';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Menu} from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from '../components/ErrorShackbar/ErrorShackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login';
import {TodolistsList} from '../features/TodolistsList';
import {RequestStatusType} from '../state/AppReducer';
import {logOutTC, meTC} from '../state/authReducer';
import CircularProgress from '@mui/material/CircularProgress';
// не забывай конкретизировать импорты в material ui, что б не тормозила загрузка

export type TaskAssocType = {
    [key: string]: TasksType[]
}

const Header = () => {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    const logOutHandler = () => {
        dispatch(logOutTC())
    }
    return (
        <AppBar position="static"  color='default'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                    <Menu/>
                </IconButton>
                <Typography variant='h6'>
                    News
                </Typography>
                {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>LogOut</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress color='success'/>}
        </AppBar>
    )
}

function AppWithRedux() {
    const dispatch = useAppDispatch()

    const isInitialized = useAppSelector(state => state.app.isInitialized)


    // Если всё ок, то ваш тудулист будет делать запрос… на старте.. сервер даст ответ..
    // И на основе этого ответа правильное значение для isLoggedIn установится в state
    useEffect(() => {
        dispatch(meTC())
    }, []);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">

            <ErrorSnackbar/>
            <Header/>

            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>

                    {/*  Для не существующего адреса  */}
                    <Route path={'404'} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    {/* перенаправляем на 404 страницу, когда написали неправильный путь*/}
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                </Routes>
            </Container>

        </div>
    );
}

export default AppWithRedux;
