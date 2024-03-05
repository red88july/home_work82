import {useSelector} from 'react-redux';
import {useLocation, Link as RegToForm} from 'react-router-dom';
import {useEffect, useState} from 'react';

import {useAppDispatch} from '../../app/hooks.ts';
import {loadingTracks, selectTracks} from './tracksSlice.ts';

import {Alert, Box, Button, CircularProgress, Typography} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import onlyRegistered from '../../assets/pic/reg-user.png';


import {selectUser} from '../users/usersSlice.ts';
import {errorPostTrack} from '../TrackStory/tracksHistorySlice.ts';
import {historyPostTrack} from '../TrackStory/tracksHistoryThunk.ts';
import {getTracks} from './tracksThunk.ts';


const listInnerBoxEffect = {
  display: 'flex',
  padding: '5px 15px 5px 15px',
  justifyContent: 'space-between',
  border: '1px solid grey',
  borderRadius: '8px',
  width: '550px',
  '&:hover': {
    boxShadow: '6px 7px 21px -5px rgba(0,0,0,0.27)',
  }
};

const buttonEffect = {
  borderRadius: '50%',
  '&:hover': {
    transition: '1s',
    transform: 'scale(0.9)',
  }
};

const listOuterBoxEffect = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '7px',
};

const regButton = {
  background: 'white',
  backgroundImage: `url(${onlyRegistered})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '25px',
  backgroundPosition: 'center',
  height: '35px',
  '&:hover': {
    outline: '2px solid #42a5f5',
  }
};

const TracksList = () => {

  const dispatch = useAppDispatch();

  const tracks = useSelector(selectTracks);
  const user = useSelector(selectUser);

  const [albumsName, setAlbumsName] = useState<string>('');
  const [artistsName, setArtistsName] = useState<string>('');

  const isLoadingTracks = useSelector(loadingTracks);
  const errorLoadTrack = useSelector(errorPostTrack);

  const location = useLocation();

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const id = search.get('album');
    if (id) {
      dispatch(getTracks(id));
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    if (tracks.length > 0) {
      setArtistsName(tracks[0].album.artist.author);
      setAlbumsName(tracks[0].album.album);
    }
  }, [tracks]);

  const playButtonClick = (id: string) => {


    const token = user?.user.token;

    if (!token) {
      return {error: 'Token is not found!'};
    }

    dispatch(historyPostTrack({track: id, token: token}));

  };

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box>
          <Typography variant="h3">{artistsName}</Typography>
        </Box>
        <KeyboardDoubleArrowRightIcon sx={{padding: '0 20px 0 20px'}}/>
        <Box>
          <Typography variant="h3">{albumsName}</Typography>
        </Box>
      </Box>
      {isLoadingTracks && (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress size={100}/>
        </Box>
      )}
      {errorLoadTrack && (
        <Alert severity="error" sx={{mt: 3, width: '100%'}}>
          {'False to load track!'}
        </Alert>
      )}
      <Box marginTop={5} sx={listOuterBoxEffect}>
        {tracks.map((track) => (
          <Box key={track._id}>
            <Box id={track._id} sx={listInnerBoxEffect}>
              <Typography gutterBottom variant="subtitle2" component="div">
                {track.number}
              </Typography>
              {user ? (
                <Button onClick={() => playButtonClick(track._id)} sx={buttonEffect}>
                  <PlayCircleIcon/> Play
                </Button>
              ) : <Button
                sx={regButton}
                component={RegToForm}
                to="/register"/>}

              <Typography gutterBottom variant="subtitle2" component="div">
                {track.track}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                {track.album.album}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                {track.duration}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default TracksList;