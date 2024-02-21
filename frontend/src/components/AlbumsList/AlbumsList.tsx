import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import imageNotAvailable from '../../assets/pic/image_not_available.png';
import { apiURL } from '../../constants.ts';


interface Props {
  id: string;
  album: string;
  date: number;
  image: string | null;
}

const AlbumsList: React.FC<Props> = ({id, album ,date ,image }) => {

  let coverImage = imageNotAvailable;

  if (image) {
    coverImage = apiURL + '/' + image;
  }

  return (
    <>
      <Grid item container spacing={2}  justifyContent="center" gap={1} marginTop={5}>
          <Box key={id}>
            <Card id={id} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <CardMedia
                component="img"
                sx={{width: 200}}
                image={image ? apiURL + '/' + image : coverImage}
                alt={album}
              />
              <CardContent sx={{textAlign: 'center'}}>
                <Typography gutterBottom variant="h5" component="div">
                  {album}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Год выпуска: {date}
                </Typography>
              </CardContent>
            </Card>
          </Box>
      </Grid>
    </>
  );
};

export default AlbumsList;