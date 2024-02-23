import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../app/hooks.ts';
import { loadingTracks, selectTracks } from './tracksSlice.ts';
import { getTracks } from './tracksThunk.ts';

import { Box, CircularProgress, Typography } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


const listInnerBoxEffect = {
  display: 'flex',
  padding: '5px 15px 5px 15px',
  justifyContent: 'space-between',
  border: '1px solid grey',
  borderRadius: '8px',
  width: '550px',
  '&:hover': {
    transition: '1s',
    transform: 'scale(0.9)',
    boxShadow: '6px 7px 21px -5px rgba(0,0,0,0.27)',
  }
};

const listOuterBoxEffect = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '7px',
};

const TracksList = () => {

  const dispatch = useAppDispatch();
  const tracks = useSelector(selectTracks);

  const isLoadingTracks = useSelector(loadingTracks);

  const [albumsName, setAlbumsName] = useState<string>('');
  const [artistsName, setArtistsName] = useState<string>('');

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
      setArtistsName(tracks[0].author);
      setAlbumsName(tracks[0].album.album);
    }
  }, [tracks]);

  return (
    <>
      <Box sx={{display:"flex", alignItems: "center"}}>
        <Box>
          <Typography variant="h3">
            {artistsName}
          </Typography>
        </Box>
        <KeyboardDoubleArrowRightIcon sx={{padding: "0 20px 0 20px"}}/>
        <Box>
          <Typography variant="h3">
            {albumsName}
          </Typography>
        </Box>
      </Box>
      {isLoadingTracks && <Box sx={{display:"flex", justifyContent:"center"}}>
          <CircularProgress  size={100}/></Box>}
      <Box marginTop={5} sx={listOuterBoxEffect}>
        {tracks.map(track => (
          <Box key={track._id}>
            <Box id={track._id} sx={listInnerBoxEffect}>
              <Typography gutterBottom variant="subtitle2" component="div">
                {track.number}
              </Typography>
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