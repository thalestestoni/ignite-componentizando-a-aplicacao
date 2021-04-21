import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { api } from "../services/api";

interface Genre {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }

interface GenresProviderProps {
    children: ReactNode
}

interface GenresContextData {
    genres: Genre[];
    selectedGenre: Genre;
    updateSelectedGenre: (genreId: number) => void;
}

export const GenresContext = createContext<GenresContextData>({} as GenresContextData);

export function GenresProvider({ children }: GenresProviderProps) {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

    useEffect(() => {
        api.get<Genre[]>('genres').then(response => 
            setGenres(response.data)
        );
    }, []);

    useEffect(() => {
        api.get(`genres/${selectedGenreId}`).then(response => 
            setSelectedGenre(response.data)
        );
    }, [selectedGenreId]);

    const updateSelectedGenre = (genreId: number) => {
        setSelectedGenreId(genreId);
    }

    return (
        <GenresContext.Provider value={{ genres, selectedGenre, updateSelectedGenre }}>
            {children}
        </GenresContext.Provider>
    )
}

export function useGenres() {
    const context = useContext(GenresContext);

    return context;
}