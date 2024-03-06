import {Box, Button, Container, Grid, MenuItem, TextField} from '@mui/material';
import React, {useState} from 'react';
import FileInput from '../../../components/FileInput/FileInput.tsx';

const AlbumsForm = () => {

  const [album, setAlbum] = useState({
    album: '',
    artist: '',
    date: '',
    image: null,
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

    setAlbum(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // await dispatch(productCreate(state)).unwrap();

      setAlbum((prevState) => {
        return {
          ...prevState,
          album: '',
          artist: '',
          date: '',
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
                value={album.album}
                onChange={inputChangeHandler}
                // error={Boolean(getfieldError('title'))}
                // helperText={getfieldError('title')}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                required
                id="date"
                label="Enter album creation date"
                name="date"
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
                value={album.artist}
                onChange={inputChangeHandler}
                name="artist"
              >
                <MenuItem value="" disabled>Please select artist...</MenuItem>
                <MenuItem value="Nightwish">Nightwish</MenuItem>
                <MenuItem value="Metallica">Metallica</MenuItem>
                <MenuItem value="Кипелов">Кипелов</MenuItem>
                <MenuItem value="HYDE">HYDE</MenuItem>
                <MenuItem value="Crazy Lixx">Crazy Lixx</MenuItem>
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
               >
                Add new album
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AlbumsForm;