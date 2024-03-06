import React, {useState} from 'react';
import {Box, Button, Container, Grid, TextField} from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput.tsx';

const ArtistsForm = () => {
  const [artist, setArtist] = useState({
    author: '',
    info: '',
    photo: null,
  });

  // const getfieldError = (fieldError: string) => {
  //   try {
  //     return isErrorLoadProduct?.errors[fieldError].message;
  //   } catch {
  //     return undefined;
  //   }
  // };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setArtist(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // await dispatch(productCreate(state)).unwrap();

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
                value={artist.author}
                onChange={inputChangeHandler}
                // error={Boolean(getfieldError('title'))}
                // helperText={getfieldError('title')}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                required
                id="info"
                label="Enter info about artist"
                name="info"
                value={artist.info}
                onChange={inputChangeHandler}
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
              >
                Add new artist
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ArtistsForm;