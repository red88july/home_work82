import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import { apiURL } from '../../../constants.ts';
import imageNotAvailable from '../../../assets/pic/image_not_available.png';
import { Artists } from '../../../types';
import {useAppSelector} from '../../../app/hooks.ts';
import { selectUserLog } from '../../users/usersSlice.ts';
import React from 'react';

const cardEffect = {
  width: '450px',
  flexWrap: "wrap",
  "&:hover": {
    transition: "1s",
    transform: "scale(0.9)",
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
  onDelete: () => void;
  onUpdate: () => void;
  isPublished: boolean;
}

const AlbumsList: React.FC<Props> = ({ id, album, date, image, artist, isPublished,onDelete, onUpdate }) => {

  const user = useAppSelector(selectUserLog);

  let coverImage = imageNotAvailable;

  if (image) {
    coverImage = apiURL + '/' + image;
  }

  const handleClickDelete = () => {
     onDelete();
  };

  const handleClickUpdate = () => {
    onUpdate();
  };

  return (
    <>
      {(user && user.user?.role === 'admin') || isPublished ? (
        <Box key={id} sx={cardEffect}>
          <Card id={id} sx={{ padding: 0 }}
                component={Link} to={`/tracks?album=` + id}>
            <CardActionArea>
              <CardContent sx={positionElements}>
                <CardMedia
                  component="img"
                  sx={{ width: 200, borderRadius: "10px" }}
                  image={coverImage}
                  alt={album}
                />
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  onClick={handleClickUpdate}
                  variant="contained"
                  color="success">Published</Button>
              </Box>
            )}
            {(user && user.user.role === 'admin') && <Box>
              <Button
                onClick={handleClickDelete}
                variant="contained"
                color="warning">Delete</Button>
            </Box>}
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default AlbumsList;
