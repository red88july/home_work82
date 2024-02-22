import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Artist from './components/Artist/Artist';

import PageNoFoundPicture from '../../frontend/src/assets/pic/404PageNotFound.jpg';
import Album from './components/Album/Album';
import TrackList from './components/TrackList/TrackList.tsx';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(<Artist />)}/>
          <Route path="/albums" element={<Album />} />
          <Route path="/tracks" element={<TrackList />} />
          <Route path="*" element={(
            <Box
              sx={{display: "flex", alignItems:'center',
                justifyContent: 'center', marginTop: '50px'}} >
              <Box component="img"
                   sx={{width: '50rem', height: '50rem'}}
                   src={PageNoFoundPicture}
                   alt="Page Not Found"/>
            </Box>
          )}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
