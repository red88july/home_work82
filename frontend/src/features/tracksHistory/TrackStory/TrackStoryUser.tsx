import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectHistoryTracks} from '../tracksHistorySlice.ts';

import {Box, Typography} from '@mui/material';
import {historyGetTrack} from '../tracksHistoryThunk.ts';
import {useAppDispatch} from '../../../app/hooks.ts';
import {selectUser} from '../../../containers/users/usersSlice.ts';

const listInnerBoxEffect = {
  display: 'flex',
  padding: '5px 15px 5px 15px',
  border: '1px solid grey',
  borderRadius: '8px',
  '&:hover': {
    boxShadow: '6px 7px 21px -5px rgba(0,0,0,0.27)',
  }
};


const TrackStoryUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const historyTracks = useSelector(selectHistoryTracks);
  const user = useSelector(selectUser);

  useEffect(() => {
    const token = user?.token;
    if (!token) {
      console.error('Token is not found!');
      return;
    }
    dispatch(historyGetTrack({token: token}));
  }, [dispatch, user]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Track History
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        {historyTracks.map((track) => (
          <Box key={track._id} sx={listInnerBoxEffect}>
            <Box id={track._id}>
              <Typography variant="subtitle2" component="div">
                Albums name: {track.track.album.album}
              </Typography>
              <Typography variant="subtitle2" component="div">
                Name of tracks: {track.track.track}
              </Typography>
              <Typography variant="subtitle2" component="div">
                Date of auditions: {track.datetime}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default TrackStoryUser;
