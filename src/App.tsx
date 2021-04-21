import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { GenresProvider } from './hooks/useGenres';
import { MoviesProvider } from './hooks/useMovies';

import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <GenresProvider>
        <MoviesProvider>
          <SideBar />
          <Content />
        </MoviesProvider>
      </GenresProvider>
    </div>
  );
}