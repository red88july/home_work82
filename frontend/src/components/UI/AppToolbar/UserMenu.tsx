import React, { useState } from 'react';
import {Box, Button, CardMedia, Menu, MenuItem} from '@mui/material';

import { useAppDispatch } from '../../../app/hooks.ts';
import { logout } from '../../../features/users/usersThunk.ts';

import TracKStoryButton from './TracKStoryButton';
import { User } from '../../../types';
import imageNotAvailable from '../../../assets/pic/image_not_available.png';
import {apiURL} from '../../../constants.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <TracKStoryButton />
      <Box>
        <CardMedia
          component="img"
          sx={{width: 50, height: 50, borderRadius: '10px', border: '3px solid black'}}
          image={user.avatar ? apiURL + '/' + user.avatar : imageNotAvailable}
          alt={user.displayName}
        />
      </Box>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.displayName}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
