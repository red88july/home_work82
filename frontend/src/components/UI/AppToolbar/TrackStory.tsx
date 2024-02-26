import React from 'react';
import {Button} from '@mui/material';
import {Link as HistoryLink} from '@mui/material';

const historyButtonEffect = {
  marginRight: "30px",
  border: "2px solid white",
  borderRadius: "10px",
};


const TrackStory:React.FC = () => {
  return (
    <>
      <Button component={HistoryLink} color="inherit" sx={historyButtonEffect}>
        Track History
      </Button>
    </>
  );
};

export default TrackStory;