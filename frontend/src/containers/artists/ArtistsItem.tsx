import React from 'react';
import { Link } from 'react-router-dom';
import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';

import { apiURL } from '../../constants.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { getAlbums } from '../albums/albumsThunk.ts';

import imageNotAvailable from '../../assets/pic/image_not_available.png';

interface Props {
  id: string;
  photo: string | null;
  author: string;
}

const cardEffect = {
  borderRadius: "10px",
  "&:hover": {
    transition: "1s",
    transform: "scale(0.9)",
    boxShadow: "6px 7px 21px -5px rgba(0,0,0,0.27)",
  }
};

const ArtistsItem: React.FC<Props> = ({id, photo, author}) => {

  const dispatch = useAppDispatch();

  let cardImage = imageNotAvailable;

  if (photo) {
    cardImage = apiURL + '/' + photo;
  }

  const handleClick = () => {
    dispatch(getAlbums(id));
  };

  return (
    <Box key={id} marginTop={10} sx={cardEffect}>
      <Card id={id} sx={{textDecoration: 'none'}}
            component={Link} to={`/albums?artist=` + id}
            onClick={handleClick}>
        <CardActionArea>
          <CardMedia
            sx={{borderRadius: "10px"}}
            component="img"
            height="250"
            image={cardImage}
            alt={author}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {author}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ArtistsItem;