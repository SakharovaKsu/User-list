import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../state/store';
import {loginTC} from '../state/authReducer';
import { Navigate } from 'react-router-dom';

export type FormType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormType = {}
            const regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            if (!values.email) {
                errors.email = 'Required'
            } else if (!regx.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.email = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Must be more 3 symbols'
            }
            return errors
        },
        onSubmit: (values) => {
            // alert(JSON.stringify(values));
            dispatch(loginTC(values))

            // очищаем форму после отправки
            formik.resetForm()
        },
    })

    // Если мы залогинены, то переотправит на страницу
    if(isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>

                {/* handleSubmit вызывает функцию onSubmit, которая находится в useFormik (собираем набранные данные) и */}
                {/* в values залетает объект initialValues */}
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label='Email'
                                   margin='normal'

                                   // засчет name, формик понимает куда записать значения в initialValues, если name не укажет, то и значение не добавит
                                   // name={'email'}
                                   // onBlur={formik.handleBlur}
                                   // onChange={formik.handleChange}
                                   // value={formik.values.email}

                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField type='password'
                                   label='Password'
                                   margin='normal'

                                   // name={'password'}
                                   // onBlur={formik.handleBlur}
                                   // onChange={formik.handleChange}
                                   // value={formik.values.password}
                                   // что бы не дублировать код, который выше, используем getFieldProps //
                                   {...formik.getFieldProps('password')}
                        />
                        {/* touched для того что б показал ошибку, после того как отработало поле*/}
                        {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.rememberMe}</div>}

                        <FormControlLabel label={'Remember me'}
                                          control={
                            <Checkbox checked={formik.values.rememberMe}
                                      {...formik.getFieldProps('rememberMe')}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'success'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}