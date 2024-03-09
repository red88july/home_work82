import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { isErrorGetLoadingArtists, loadingArtists, selectArtists } from './artistsSlice.ts';
import { getArtists } from './artistsThunk.ts';

import ArtistsItem from './components/ArtistsItem';

const Artists = () => {

  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loadingArtist = useAppSelector(loadingArtists);
  const errorLoadingArtist = useAppSelector(isErrorGetLoadingArtists);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <Grid container spacing={2} maxWidth='xl' flexDirection='column' marginTop={5}>
        <Grid item justifyContent="left" alignItems="left">
          <Typography variant="h4">Artists</Typography>
        </Grid>
      {loadingArtist && <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress size={100}/></Box>}
      {errorLoadingArtist && (<Alert severity="warning">False to load Artists!</Alert>)}
      <Grid item display="flex" justifyContent="center" flexWrap="wrap" gap={1}>
        {artists.map(artist => (
          <ArtistsItem
            id={artist._id}
            key={artist._id}
            photo={artist.photo}
            author={artist.author}
            isPublished={artist.isPublished}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Artists;