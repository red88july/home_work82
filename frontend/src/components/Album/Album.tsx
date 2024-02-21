import { selectAlbum } from '../../containers/album/albumSlice.ts';
import { getAlbums } from '../../containers/album/albumThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AlbumsList from '../AlbumsList/AlbumsList';

const Album = () => {

  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbum);

  const location = useLocation();

  useEffect(() => {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('artist');

    if (id) {
      dispatch(getAlbums(id));

    }
  }, [dispatch, location.search]);

  return (
    <div>
      {albums.map(album => (
        <AlbumsList
          key={album._id}
          id={album._id}
          album={album.album}
          date={album.date}
          image={album.image}
        />
      ))}
    </div>
  );
};

export default Album;