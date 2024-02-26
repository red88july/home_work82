import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {selectHistoryTracks} from './tracksHistorySlice.ts';

import {Box, Typography} from '@mui/material';
import {historyGetTrack} from './tracksHistoryThunk.ts';
import {useAppDispatch} from '../../app/hooks.ts';
import {selectUser} from '../users/usersSlice.ts';

const listInnerBoxEffect = {
  display: 'flex',
  padding: '5px 15px 5px 15px',
  border: '1px solid grey',
  marginBottom: "5px",
  width: "500px",
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
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="subtitle2">
                  <p style={{margin: "0 10px 3px 0" }}><b>Albums name:</b></p>
                </Typography>
                <Typography variant="subtitle2">
                  <em>{track.track.album.album}</em>
                </Typography>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="subtitle2">
                  <p style={{margin: '0 10px 3px 0'}}><b>Name of tracks:</b></p>
                </Typography>
                <Typography variant="subtitle2">
                  <em>{track.track.track}</em>
                </Typography>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="subtitle2">
                  <p style={{margin: '0 10px 3px 0'}}><b>Date of auditions:</b></p>
                </Typography>
                <Typography variant="subtitle2">
                  <em>{dayjs(track.datetime).format('YYYY-MM-DD HH:mm:ss')}</em>
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default TrackStoryUser;