import { PropsWithChildren } from 'react';
import { Alert } from '@mui/material';

import { useAppSelector } from '../../app/hooks.ts';
import { selectUserLog } from '../../features/users/usersSlice.ts';

import AppToolbar from '../UI/AppToolbar/AppToolbar';
import FormBar from '../FormBar/FormBar';

const Layout:React.FC<PropsWithChildren> = ({children}) => {
  const user = useAppSelector(selectUserLog);
  return (
    <>
      <header>
        <AppToolbar/>
        {user?.role === 'admin' || user?.role === 'user' ?
          (<FormBar />) :
          <Alert severity='info'>
            <b>Welcome to Spot music app! If you want to add new artist/albums/tracks you need to be registered!</b>
          </Alert>}
      </header>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;