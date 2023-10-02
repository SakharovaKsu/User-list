import React from 'react';
import '../App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {TasksType} from '../state/TaskReducer';
import {useAppSelector} from '../state/store';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Menu} from '@mui/icons-material';
// не забывай конкретизировать импорты в material ui, что б не тормозила загрузка
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from '../components/ErrorShackbar/ErrorShackbar';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login';
import {TodolistsList} from '../features/TodolistsList';
import {RequestStatusType} from '../state/AppReducer';

export type TaskAssocType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)

    return (
        <div className="App">

            <ErrorSnackbar/>
            <AppBar position="static"  color="default">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color='success'/>}
            </AppBar>

            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    );
}

export default AppWithRedux;
