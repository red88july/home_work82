import React, { useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { registration } from './usersThunk.ts';
import { errorRegistration } from './usersSlice.ts';
import { useAppDispatch } from '../../app/hooks.ts';

import { useNavigate } from 'react-router-dom';
import { RegistrationMutation } from '../../types';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const RegisterForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector(errorRegistration);

  const [register, setRegister] = useState<RegistrationMutation>({
    username: '',
    password: '',
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setRegister(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(registration(register)).unwrap();
      navigate('/');
    } catch (e) {
      //error
    }
  };
  console.log(error);

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
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={submitForm} sx={{mt: 1}}>
          <TextField
            required
            fullWidth
            id="username"
            type="username"
            name="username"
            value={register.username}
            label="Username"
            onChange={inputChange}
            error={Boolean(getFieldError('username'))}
            helperText={getFieldError('username')}
            margin="normal"
            autoComplete="new-username"
            autoFocus
          />
          <TextField
            required
            fullWidth
            id="password"
            type="password"
            name="password"
            value={register.password}
            label="Password"
            onChange={inputChange}
            error={Boolean(getFieldError('password'))}
            helperText={getFieldError('password')}
            margin="normal"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;