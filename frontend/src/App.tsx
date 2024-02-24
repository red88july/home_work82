import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Artists from './containers/artists/Artists';

import PageNoFoundPicture from '../../frontend/src/assets/pic/404PageNotFound.jpg';
import Albums from './containers/albums/Albums';
import TracksList from './containers/tracks/TracksList';
import RegisterForm from './containers/users/RegisterForm.tsx';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(<Artists />)}/>
          <Route path="/albums" element={<Albums />} />
          <Route path="/tracks" element={<TracksList />} />
          <Route path="/register" element={<RegisterForm />} />
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
