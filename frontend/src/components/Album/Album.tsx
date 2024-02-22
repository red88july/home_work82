import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {loadingAlbum, selectAlbum} from '../../containers/album/albumSlice.ts';
import { getAlbums } from '../../containers/album/albumThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';


import AlbumsList from '../AlbumsList/AlbumsList';
import {Box, CircularProgress, Grid} from '@mui/material';
import {useSelector} from 'react-redux';

const Album = () => {

  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbum);
  const isLoadingAlbum = useSelector(loadingAlbum);

  const location = useLocation();

  useEffect(() => {

    const search = new URLSearchParams(location.search);
    const id = search.get('artist');

    if (id) {
      dispatch(getAlbums(id));
    }
  }, [dispatch, location.search]);

  return (
    <Grid item container spacing={2} marginTop={10} display="flex" justifyContent="center" gap={1}>
      {isLoadingAlbum && <Box sx={{display:"flex", justifyContent:"center"}}>
        <CircularProgress  size={100}/></Box>}
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
  );
};

export default Album;