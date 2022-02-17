import { useGenres } from "../hooks/useGenres";

import { Button } from '../components/Button';

import '../styles/sidebar.scss';
import { useCallback } from "react";

export function SideBar() {
  const { genres, selectedGenre, updateSelectedGenre } = useGenres();

  const handleClickButton = useCallback((id: number) => {
    updateSelectedGenre(id);
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenre.id === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}
