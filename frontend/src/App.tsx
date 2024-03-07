import {Box, Container} from '@mui/material';
import {Route, Routes} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Artists from './features/artists/Artists';

import PageNoFoundPicture from '../../frontend/src/assets/pic/404PageNotFound.jpg';
import Albums from './features/albums/Albums';
import TracksList from './features/tracks/components/TracksList';
import RegisterForm from './features/users/RegisterForm';
import LoginForm from './features/users/LoginForm';
import TrackStoryUser from './features/TrackStory/TrackStoryUser';
import ArtistsForm from './features/artists/components/ArtistsForm';
import AlbumsForm from './features/albums/components/AlbumsForm';
import TracksForm from './features/tracks/components/TracksForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {useAppSelector} from './app/hooks.ts';
import {selectUserLog} from './features/users/usersSlice.ts';

function App() {
  const user = useAppSelector(selectUserLog);
  return (
    <>
      <Layout>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={(<Artists/>)}/>
            <Route path="/albums" element={<Albums/>}/>
            <Route path="/tracks" element={<TracksList/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/track_story" element={
              <ProtectedRoute isAllowed={user && (user.user?.role === 'admin')}>
                <TrackStoryUser/>
              </ProtectedRoute>
            }/>
            <Route path="/artist-form" element={
              <ProtectedRoute isAllowed={user && (user.user?.role === 'admin')}>
                <ArtistsForm/>
              </ProtectedRoute>
            }/>
            <Route path="/album-form" element={
              <ProtectedRoute isAllowed={user && (user.user?.role === 'admin')}>
                <AlbumsForm/>
              </ProtectedRoute>
            }/>
            <Route path="/track-form" element={
              <ProtectedRoute isAllowed={user && (user.user?.role === 'admin')}>
                <TracksForm/>
              </ProtectedRoute>
            }/>
            <Route path="*" element={(
              <Box
                sx={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginTop: '50px'
                }}>
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
