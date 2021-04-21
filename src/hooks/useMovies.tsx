import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useGenres } from "./useGenres";

interface Movie {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }

interface MoviesProviderProps {
    children: ReactNode
}

interface MoviesContextData {
    movies: Movie[]
}

export const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData);

export function MoviesProvider({ children }: MoviesProviderProps) {
    const [movies, setMovies] = useState<Movie[]>([]);

    const { selectedGenre } = useGenres();

    useEffect(() => {
        api.get(`movies/?Genre_id=${selectedGenre.id}`).then(response => 
            setMovies(response.data)
        );
    }, [selectedGenre]);

    return (
        <MoviesContext.Provider value={{ movies }}>
            {children}
        </MoviesContext.Provider>
    );
}

export function useMovies() {
    const context = useContext(MoviesContext);

    return context;
}