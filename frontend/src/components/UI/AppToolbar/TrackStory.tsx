import React from 'react';
import {Button} from '@mui/material';
import {NavLink as HistoryLink} from 'react-router-dom';

const historyButtonEffect = {
  marginRight: "30px",
  border: "2px solid white",
  borderRadius: "10px",
};

const TrackStory:React.FC = () => {

  return (
    <>
      <Button component={HistoryLink}
              to='/track_story'
              color="inherit"
              sx={historyButtonEffect}>
        Track History
      </Button>
    </>
  );
};

export default TrackStory;