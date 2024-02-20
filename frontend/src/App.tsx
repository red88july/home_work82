import AppToolbar from './components/AppToolbar/AppToolbar.tsx';
import Artist from './components/Artist/Artist.tsx';

function App() {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Artist/>
      </main>
    </>
  );
}

export default App;
