import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';

import imageNotAvailable from '../../assets/images/image_not_available.png';
import {apiURL} from '../../constants.ts';
import React from 'react';

interface Props {
  id: string;
  photo: string | null;
  author: string;
}

const ArtistItem: React.FC<Props> = ({id, photo, author}) => {

  let cardImage = imageNotAvailable;

  if (photo) {
    cardImage = apiURL + '/' + photo;
  }

  return (
        <Box key={id} marginTop={10}>
          <Card id={id} sx={{maxWidth: 345}}>
            <CardActionArea>
              <CardMedia
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

export default ArtistItem;