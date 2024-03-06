import React, { useState } from 'react';
import { User } from '../../../types';
import { Button, Menu, MenuItem } from '@mui/material';
import {useAppDispatch} from '../../../app/hooks.ts';
import {logout} from '../../../features/users/usersThunk.ts';
import TracKStoryButton from './TracKStoryButton.tsx';

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
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.username}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
