import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {googleLogin, login} from './usersThunk';
import {selectLoginError, selectLoginLoading} from './usersSlice';
import {LoginMutation} from '../../types';
import {useSelector} from 'react-redux';
import {GoogleLogin} from '@react-oauth/google';


const LoginForm = () => {

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const isLogin = useSelector(selectLoginLoading);

  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: ''
  });

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOpenIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {error && (
          <Alert severity="error" sx={{mt: 3, width: '100%'}}>
            {error.error || 'Username or password is not correct!'}
          </Alert>
        )}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
             void googleLoginHandler(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 1}}>
          <TextField
            required
            fullWidth
            type="email"
            name="email"
            value={state.email}
            label="E-mail"
            onChange={inputChange}
            margin="normal"
            autoComplete="current-email"
          />
          <TextField
            required
            fullWidth
            type="password"
            name="password"
            value={state.password}
            label="Password"
            onChange={inputChange}
            margin="normal"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={isLogin}
          >
            {isLogin ? <CircularProgress/> : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Or Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;