import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { loadingAlbum, selectAlbum } from './albumsSlice.ts';
import { getAlbums } from './albumsThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';


import AlbumsList from './AlbumsList.tsx';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Albums = () => {

  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbum);
  const isLoadingAlbum = useSelector(loadingAlbum);

  const [artistName, setArtistName] = useState<string>('');

  const location = useLocation();

  useEffect(() => {

    const search = new URLSearchParams(location.search);
    const id = search.get('artist');

    if (id) {
      dispatch(getAlbums(id));
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    if (albums.length > 0) {
      setArtistName(albums[0].artist.author);
    }
  }, [albums]);

  return (
    <>
      <Box>
        <Typography variant="h3">
          {artistName}
        </Typography>
      </Box>
      <Grid item container  marginTop={7} display="flex" justifyContent="center" gap={1}>
        {isLoadingAlbum && <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress size={100}/></Box>}
        {albums.map(album => (
          <AlbumsList
            key={album._id}
            id={album._id}
            album={album.album}
            date={album.date}
            image={album.image}
            artist={album.artist}
          />
        ))}
      </Grid>
    </>
  );
};

export default Albums;