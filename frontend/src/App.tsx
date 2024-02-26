import {Box, Container} from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Artists from './containers/artists/Artists';

import PageNoFoundPicture from '../../frontend/src/assets/pic/404PageNotFound.jpg';
import Albums from './containers/albums/Albums';
import TracksList from './containers/tracks/TracksList';
import RegisterForm from './containers/users/RegisterForm.tsx';
import LoginForm from './containers/users/LoginForm.tsx';
import TrackStoryUser from './containers/TrackStory/TrackStoryUser.tsx';

function App() {
  return (
    <>
      <Layout>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={(<Artists />)}/>
            <Route path="/albums" element={<Albums />} />
            <Route path="/tracks" element={<TracksList />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/track_story" element={<TrackStoryUser />} />
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
        </Container>
      </Layout>
    </>
  );
}

export default App;
