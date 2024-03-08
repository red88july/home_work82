import React from 'react';
import { Link } from 'react-router-dom';
import {Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';

import { apiURL } from '../../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { getAlbums } from '../../albums/albumsThunk.ts';

import imageNotAvailable from '../../../assets/pic/image_not_available.png';
import { selectUserLog } from '../../users/usersSlice.ts';

interface Props {
  id: string;
  photo: string | null;
  author: string;
  isPublished: boolean;
}

const cardEffect = {
  borderRadius: "10px",
  "&:hover": {
    transition: "1s",
    transform: "scale(0.9)",
    boxShadow: "6px 7px 21px -5px rgba(0,0,0,0.27)",
  }
};

const ArtistsItem: React.FC<Props> = ({id, photo, author, isPublished}) => {

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserLog);

  let cardImage = imageNotAvailable;

  if (photo) {
    cardImage = apiURL + '/' + photo;
  }

  const handleClick = () => {
    dispatch(getAlbums(id));
  };

  return (
    <>
      {(user && user.user.role === 'admin') || isPublished ? (
        <Box key={id} marginTop={10} sx={cardEffect}>
          <Card
            id={id}
            sx={{ textDecoration: 'none' }}
            component={Link}
            to={`/albums?artist=${id}`}
            onClick={handleClick}>
            <CardActionArea>
              <CardMedia sx={{ borderRadius: '10px' }} component="img" height="250" image={cardImage} alt={author} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {author}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Box display="flex"  alignItems="center" justifyContent="center" gap={2} padding={2}>
            {isPublished ? (
              <Typography
                variant="body2"
                color="#4caf50">
                <b>Published</b>
              </Typography>
            ) : (
              <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                <Typography
                  variant="body2"
                  color="#ef5350">
                  <b>Not Published</b>
                </Typography>
                <Button
                  variant="contained"
                  color="success">Published</Button>
              </Box>
            )}
            {(user && user.user.role === 'admin') && <Box>
              <Button
                variant="contained"
                color="warning">Delete</Button>
            </Box>}
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default ArtistsItem;