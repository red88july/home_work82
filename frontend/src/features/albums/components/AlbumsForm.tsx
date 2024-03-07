import {Box, Button, CircularProgress, Container, Grid, MenuItem, TextField} from '@mui/material';
import React, {useState} from 'react';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {AlbumsData} from '../../../types';
import {selectArtists} from '../../artists/artistsSlice.ts';

import {isErrorLoadAlbums, isLoadingAlbums} from '../albumsSlice.ts';
import {albumCreate} from '../albumsThunk.ts';

const AlbumsForm = () => {
  const dispatch = useAppDispatch();

  const isLoadingCreateAlbum = useAppSelector(isLoadingAlbums);
  const isErrorCreateAlbum = useAppSelector(isErrorLoadAlbums);

  const artists = useAppSelector(selectArtists);

  const [album, setAlbum] = useState<AlbumsData>({
    album: '',
    artist: '',
    date: 0,
    image: null,
  });

  const getfieldError = (fieldError: string) => {
    try {
      return isErrorCreateAlbum?.errors[fieldError].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setAlbum(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(albumCreate(album)).unwrap();

      setAlbum((prevState) => {
        return {
          ...prevState,
          album: '',
          date: 0,
        };
      });

    } catch (e) {
      //
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setAlbum(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };
  return (
    <Container maxWidth="sm">
      <Box>
        <form
          autoComplete="off"
          onSubmit={onFormSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                required
                fullWidth
                id="album"
                label="Enter album name"
                name="album"
                autoComplete="new-album"
                value={album.album}
                onChange={inputChangeHandler}
                error={Boolean(getfieldError('album'))}
                helperText={getfieldError('album')}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                required
                id="date"
                label="Enter album creation date"
                name="date"
                autoComplete="new-date"
                value={album.date}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item md>
              <TextField
                fullWidth
                required
                select
                id="artist" label="Artist name"
                autoComplete="new-name"
                value={album.artist}
                onChange={inputChangeHandler}
                name="artist"
              >
                <MenuItem value="" disabled>Please select artist...</MenuItem>
                {artists.map((artist) => (
                  <MenuItem key={artist._id} value={artist._id}>
                    {artist.author}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs>
              <FileInput
                label="Image"
                name="image"
                onChange={fileInputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                disabled={isLoadingCreateAlbum}
               >
                {isLoadingCreateAlbum ? (<CircularProgress/>) : 'Add new album'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AlbumsForm;