import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { loadingArtists, selectArtists } from './artistsSlice.ts';
import { getArtists } from './artistsThunk.ts';
import ArtistsItem from './components/ArtistsItem';

const Artists = () => {

  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loadingArtist = useAppSelector(loadingArtists);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2} marginTop={5}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Artists</Typography>
        </Grid>
      </Grid>
      {loadingArtist && <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress size={100}/></Box>}
      <Grid item container spacing={2} display="flex" justifyContent="center" gap={1}>
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