import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import UserLogin from '../../models/UserLogin';
import { api, login } from '../../services/Service';
import { addToken } from '../../store/tokens/Actions';
import { toast } from 'react-toastify';
import './Login.css'
import { ClassNames } from '@emotion/react';

function Login() {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            token: ''
        }
    )

    function updateModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token != '') {
            dispatch(addToken(token));
                    navigate('/home')
        
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            // const resposta = await api.post(`/usuarios/logar`, userLogin)
            // setToken(resposta.data.token)

            await login(`auth/logar`, userLogin, setToken )

            toast.success('Usuário logado com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
                });
        } catch(error) {
            toast.error('Dados do usuário inconsistentes. Erro ao logar!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
                });
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box padding={20} className='box'>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center'>Entrar</Typography>
                        <TextField id='usuario' value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField id='senha' value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='secondary'>
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center' className='conta'>Não tem uma conta?</Typography>
                        </Box>
                        <Link className='link' to='/cadastrousuario'>
                            <Typography variant='subtitle1' gutterBottom align='center' className='conta'>Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem'>
            </Grid>
        </Grid>
        
    );
}

export default Login;