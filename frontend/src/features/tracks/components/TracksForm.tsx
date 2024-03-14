import React, {useEffect, useState} from 'react';
import { Box, Button, CircularProgress, Container, Grid, MenuItem, TextField } from '@mui/material';

import { trackCreate } from '../tracksThunk.ts';
import { isErrorLoadTracks, isLoadingTracks } from '../tracksSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';

import { TracksData } from '../../../types';
import { getAllAlbums } from '../../albums/albumsThunk.ts';
import { selectAllAlbum } from '../../albums/albumsSlice.ts';
import { selectUserLog } from '../../users/usersSlice.ts';

const TracksForm: React.FC = () => {

  const dispatch = useAppDispatch();
  const isLoadDataTrack = useAppSelector(isLoadingTracks);
  const isErrorLoadDataTrack = useAppSelector(isErrorLoadTracks);

  const albums = useAppSelector(selectAllAlbum);
  const user = useAppSelector(selectUserLog);
  const filterAlbums = user?.role === 'admin' ? albums : albums.filter(album => album.isPublished);

  const [track, setTrack] = useState<TracksData>({
    number: 0,
    track: '',
    album: '',
    duration: '',
  });

  useEffect(() => {
      dispatch(getAllAlbums());
  }, [dispatch]);

  const getFieldError = (fieldError: string) => {
    try {
      return isErrorLoadDataTrack?.errors[fieldError].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrack((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(trackCreate(track)).unwrap();
      setTrack({
        number: 0,
        track: '',
        album: '',
        duration: '',
      });
    } catch (e) {
      //
    }
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <form autoComplete="off" onSubmit={onFormSubmit}>
          <Grid item md marginBottom={2}>
            <TextField
              fullWidth
              required
              id="number"
              label="Enter number of track"
              name="number"
              autoComplete="new-number"
              value={track.number}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('number'))}
              helperText={getFieldError('number')}
            />
          </Grid>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                fullWidth
                required
                id="track"
                label="Enter track name"
                name="track"
                autoComplete="new-track"
                value={track.track}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('track'))}
                helperText={getFieldError('track')}
              />
            </Grid>
            <Grid item md>
              <TextField
                fullWidth
                required
                select
                id="album"
                label="Album name"
                value={track.album}
                onChange={inputChangeHandler}
                name="album">
                <MenuItem value="" disabled>
                  Please select album name...
                </MenuItem>
                {filterAlbums.map((album) => (
                  <MenuItem key={album._id} value={album._id}>
                    {album.album}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                required
                id="duration"
                label="Enter duration of track"
                name="duration"
                value={track.duration}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('duration'))}
                helperText={getFieldError('duration')}
              />
            </Grid>
            <Grid item xs>
              <Button fullWidth type="submit" color="primary" variant="contained" disabled={isLoadDataTrack}>
                {isLoadDataTrack ? <CircularProgress /> : 'Add new track'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default TracksForm;
