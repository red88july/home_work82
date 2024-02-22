import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';

import {apiURL} from '../../constants.ts';
import imageNotAvailable from '../../assets/pic/image_not_available.png';
import {Artists} from '../../types';

const cardEffect = {
  width: '50%',
  "&:hover": {
    boxShadow: "6px 7px 21px -5px rgba(0,0,0,0.27)",
  }
};

const positionElements = {
  display: 'flex',
  justifyContent: "space-around",
  textAlign: 'center',
};

interface Props {
  id: string;
  album: string;
  date: number;
  image: string | null;
  artist: Artists;
}

const AlbumsList: React.FC<Props> = ({id, album, date, image, artist}) => {

  let coverImage = imageNotAvailable;

  if (image) {
    coverImage = apiURL + '/' + image;
  }

  return (
    <Box key={id} sx={cardEffect} >
      <Card id={id} sx={{padding: 0}} >
        <CardActionArea>
          <CardContent sx={positionElements}>
            <CardMedia
              component="img"
              sx={{width: 200}}
              image={image ? apiURL + '/' + image : coverImage}
              alt={album}
            />
            <Box sx={{display:"flex", alignItems:"center"}}>
              <Box>
                <Typography gutterBottom variant="h5" component="div">
                  Album: {album}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Artist: {artist.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Date path: {date}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default AlbumsList;