import {Box, Container} from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Artists from './features/artists/Artists';

import PageNoFoundPicture from '../../frontend/src/assets/pic/404PageNotFound.jpg';
import Albums from './features/albums/Albums';
import TracksList from './features/tracks/components/TracksList.tsx';
import RegisterForm from './features/users/RegisterForm.tsx';
import LoginForm from './features/users/LoginForm.tsx';
import TrackStoryUser from './features/TrackStory/TrackStoryUser.tsx';
import ArtistsForm from './features/artists/components/ArtistsForm.tsx';
import AlbumsForm from './features/albums/components/AlbumsForm.tsx';
import TracksForm from './features/tracks/components/TracksForm.tsx';

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
            <Route path="/artist-form" element={<ArtistsForm />} />
            <Route path="/album-form" element={<AlbumsForm />} />
            <Route path="/track-form" element={<TracksForm />} />
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
