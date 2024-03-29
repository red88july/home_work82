import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Alert, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useAppSelector } from '../../app/hooks.ts';
import { selectUserLog } from '../../features/users/usersSlice.ts';

const FormBar: React.FC = () => {

  const user = useAppSelector(selectUserLog);

  const [timer, setTimer] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimer(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box marginTop={10}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1}>
        <Box>
          {timer && user && (
            <Box maxWidth="700px">
              <Alert severity="success">
                <p><strong><em>{user?.displayName}</em> you are in a menu where you can add new artists, as well as
                  add
                  their albums and tracks to albums</strong></p>
              </Alert>
            </Box>
          )}
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            component={NavLink}
            to="/artist-form"
            startIcon={<AddIcon/>}>
            Add Artist
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={NavLink}
            to="/album-form"
            startIcon={<AddIcon/>}>
            Add Album
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={NavLink}
            to="/track-form"
            startIcon={<AddIcon/>}>
            Add Track
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormBar;