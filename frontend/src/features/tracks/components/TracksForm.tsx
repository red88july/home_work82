import React, {useState} from 'react';
import {Box, Button, Container, Grid, MenuItem, TextField} from '@mui/material';

const TracksForm: React.FC= () => {

  const [track, setTrack] = useState({
    track: '',
    album: '',
    duration: '',
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

    setTrack(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // await dispatch(productCreate(state)).unwrap();

      setTrack((prevState) => {
        return {
          ...prevState,
          track: '',
          album: '',
          duration: '',
        };
      });

    } catch (e) {
      //
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setTrack(prevState => ({
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
                fullWidth
                required
                id="track"
                label="Enter track name"
                name="track"
                value={track.track}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item md>
              <TextField
                fullWidth
                required
                select
                id="album" label="Album name"
                value={track.album}
                onChange={inputChangeHandler}
                name="track"
              >
                <MenuItem value="" disabled>Please select album name...</MenuItem>
                <MenuItem value="Death Magnetic">Death Magnetic</MenuItem>
                <MenuItem value="Dark Passion Play">Dark Passion Play</MenuItem>
                <MenuItem value="Звезды и Кресты">Звезды и Кресты</MenuItem>
                <MenuItem value="ANTI">ANTI</MenuItem>
                <MenuItem value="Forever Wild">Forever Wild</MenuItem>
                <MenuItem value="Load">Load</MenuItem>
                <MenuItem value="Master of Puppets">Master of Puppets</MenuItem>
                <MenuItem value="Oceanborn">Oceanborn</MenuItem>
                <MenuItem value="Angels Fall First">Angels Fall First</MenuItem>
                <MenuItem value="Жить вопреки">Жить вопреки</MenuItem>
                <MenuItem value="Реки времен">Реки времен</MenuItem>
                <MenuItem value="FAITH">FAITH</MenuItem>
                <MenuItem value="ROENTGEN">ROENTGEN</MenuItem>
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

export default TracksForm;