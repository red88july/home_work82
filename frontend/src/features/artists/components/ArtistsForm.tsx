import React, { useState } from 'react';
import { Box, Button, CircularProgress, Container, Grid, TextField } from '@mui/material';

import { artistCreate } from '../artistsThunk.ts';
import { isErrorLoadArtists, isLoadingArtists } from '../artistsSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';

import FileInput from '../../../components/FileInput/FileInput';
import { ArtistsData } from '../../../types';

const ArtistsForm:React.FC = () => {

  const dispatch = useAppDispatch();
  const isLoadingCreateArtist = useAppSelector(isLoadingArtists);
  const isErrorCreateArtist = useAppSelector(isErrorLoadArtists);

  const [artist, setArtist] = useState<ArtistsData>({
    author: '',
    photo: null,
    info: '',
  });

  const getfieldError = (fieldError: string) => {
    try {
      return isErrorCreateArtist?.errors[fieldError].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setArtist(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(artistCreate(artist)).unwrap();

      setArtist((prevState) => {
        return {
          ...prevState,
          author: '',
          info: '',
        };
      });

    } catch (e) {
      //
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setArtist(prevState => ({
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
                id="author"
                label="Enter name of artist/band"
                name="author"
                autoComplete="new-author"
                value={artist.author}
                onChange={inputChangeHandler}
                error={Boolean(getfieldError('author'))}
                helperText={getfieldError('author')}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                required
                id="info"
                label="Enter info about artist"
                name="info"
                autoComplete="new-info"
                value={artist.info}
                onChange={inputChangeHandler}
                error={Boolean(getfieldError('info'))}
                helperText={getfieldError('info')}
              />
            </Grid>
            <Grid item xs>
              <FileInput
                label="Photo by artist"
                name="photo"
                onChange={fileInputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                disabled={isLoadingCreateArtist}
              >
                {isLoadingCreateArtist ? (<CircularProgress />) : 'Add new artist'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ArtistsForm;