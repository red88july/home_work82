import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import { isErrorGetLoadingAlbums, loadingAlbum, selectAlbum } from './albumsSlice.ts';
import { deleteAlbum, getAlbums, updateAlbum } from './albumsThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';

import AlbumsList from './components/AlbumsList';
import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Albums = () => {

  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbum);
  const isLoadingAlbum = useSelector(loadingAlbum);
  const errorLoadAlbums = useAppSelector(isErrorGetLoadingAlbums);

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

  const handleDeleteAlbum = async (id: string) => {
    await dispatch(deleteAlbum(id));

    const search = new URLSearchParams(location.search);
    const getArtistId = search.get('artist');

    if (getArtistId) {
      await dispatch(getAlbums(getArtistId));
    }
  };

  const handleUpdateAlbum = async (id: string) => {
    await dispatch(updateAlbum(id));

    const search = new URLSearchParams(location.search);
    const getArtistId = search.get('artist');

    if (getArtistId) {
      await dispatch(getAlbums(getArtistId));
    }
  };

  return (
    <>
      <Grid container marginTop={5}>
          <Typography variant="h3">
            {artistName}
          </Typography>
        <Grid item container marginTop={7} gap={1}>
          {isLoadingAlbum && <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <CircularProgress size={100}/></Box>}
          {errorLoadAlbums && (<Alert severity="warning">False to load Albums!</Alert>)}
          {albums.map(album => (
            <AlbumsList
              key={album._id}
              id={album._id}
              album={album.album}
              date={album.date}
              image={album.image}
              artist={album.artist}
              isPublished={album.isPublished}
              onDelete={() => handleDeleteAlbum(album._id)}
              onUpdate={() => handleUpdateAlbum(album._id)}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Albums;