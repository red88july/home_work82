import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectArtists } from '../../containers/artists/artistsSlice.ts';
import { getArtists } from '../../containers/artists/artistsThunk.ts';
import ArtistItem from '../ArtistItem/ArtistItem';

const Artist = () => {

  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

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
        <Grid item container spacing={2} display="flex" justifyContent="center" gap={1}>
          {artists.map(artist => (
            <ArtistItem
              id={artist._id}
              key={artist._id}
              photo={artist.photo}
              author={artist.author}
            />
          ))}
        </Grid>
      </Grid>
  );
};

export default Artist;