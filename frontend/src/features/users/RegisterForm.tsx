import React, {useState} from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Link,
  CircularProgress
} from '@mui/material';

import {useSelector} from 'react-redux';
import {registration} from './usersThunk.ts';
import {errorRegistration, loadingRegistration} from './usersSlice.ts';
import {useAppDispatch} from '../../app/hooks.ts';

import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {RegistrationMutation} from '../../types';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FileInput from '../../components/FileInput/FileInput.tsx';

const RegisterForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector(errorRegistration);

  const isRegistration = useSelector(loadingRegistration);

  const [register, setRegister] = useState<RegistrationMutation>({
    displayName: '',
    email: '',
    password: '',
    avatar: null,
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

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setRegister(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
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
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={submitForm} sx={{mt: 1}}>
          <TextField
            required
            fullWidth
            id="displayName"
            type="displayName"
            name="displayName"
            value={register.displayName}
            label="Enter name of user"
            onChange={inputChange}
            error={Boolean(getFieldError('displayName'))}
            helperText={getFieldError('displayName')}
            margin="normal"
            autoComplete="new-displayName"
            autoFocus
          />
          <TextField
            required
            fullWidth
            id="email"
            type="email"
            name="email"
            value={register.email}
            label="E-mail"
            onChange={inputChange}
            error={Boolean(getFieldError('email'))}
            helperText={getFieldError('email')}
            margin="normal"
            autoComplete="new-email"
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
          <Grid item xs marginTop={1}>
            <FileInput
              label="Enter your avatar"
              name="avatar"
              onChange={fileInputChangeHandler}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={isRegistration}
          >
            {isRegistration ? <CircularProgress/> : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;