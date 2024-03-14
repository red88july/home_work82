import {useSelector} from 'react-redux';
import {useLocation, Link as RegToForm} from 'react-router-dom';
import {useEffect, useState} from 'react';

import {useAppDispatch} from '../../../app/hooks.ts';
import {loadingTracks, selectTracks} from '../tracksSlice.ts';

import {Alert, Box, Button, CircularProgress, Typography} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import onlyRegistered from '../../../assets/pic/reg-user.png';

import {selectUserLog} from '../../users/usersSlice.ts';
import {errorPostTrack} from '../../TrackStory/tracksHistorySlice.ts';
import {historyPostTrack} from '../../TrackStory/tracksHistoryThunk.ts';
import {deleteTrack, getTracks, updateTrack} from '../tracksThunk.ts';


const listInnerBoxEffect = {
  display: 'flex',
  padding: '5px 15px 5px 15px',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid grey',
  borderRadius: '8px',
  width: '700px',
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
  const user = useSelector(selectUserLog);

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

    const token = user?.token;

    if (!token) {
      return {error: 'Token is not found!'};
    }

    dispatch(historyPostTrack({track: id, token: token}));

  };

  const handleDeleteTrack = async (id: string) => {
    await dispatch(deleteTrack(id));

    const search = new URLSearchParams(location.search);
    const getALbumsId = search.get('album');

    if (getALbumsId) {
      await dispatch(getTracks(getALbumsId));
    }
  };

  const handleUpdateTrack = async (id: string) => {
    await dispatch(updateTrack(id));

    const search = new URLSearchParams(location.search);
    const getALbumsId = search.get('album');

    if (getALbumsId) {
      await dispatch(getTracks(getALbumsId));
    }
  };

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center', marginTop: '50px'}}>
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
                ) : <Button sx={regButton} component={RegToForm} to="/register"/>}
                <Typography gutterBottom variant="subtitle2" component="div">
                  {track.track}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {track.album.album}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {track.duration}
                </Typography>
                <Box display="flex"  alignItems="center" justifyContent="center" gap={2} padding={2}>
                  {track.isPublished ? (
                    <Typography
                      variant="body2"
                      color="#4caf50">
                      <b>Published</b>
                    </Typography>
                  ) : (
                    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                      <Typography
                        variant="body2"
                        color="#ef5350">
                        <b>Not Published</b>
                      </Typography>
                      <Button
                        onClick={() => handleUpdateTrack(track._id)}
                        variant="contained"
                        color="success">Published</Button>
                    </Box>
                  )}
                  {(user && user.role === 'admin') && <Box>
                    <Button
                      onClick={() => handleDeleteTrack(track._id)}
                      variant="contained"
                      color="warning">Delete</Button>
                  </Box>}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
    </>
  );
};

export default TracksList;