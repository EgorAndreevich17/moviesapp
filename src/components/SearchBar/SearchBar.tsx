import { useState } from "react";
import { Movie } from "../../models/Movie";
import './SearchBar.scss'

interface SearchBarProps {
  searchMovie: (query: string) => Promise<Movie[]>;
  setMovies: (movies: Movie[]) => void;
}

export default function SearchBar({ setMovies, searchMovie }: SearchBarProps) {
  const [query, updateQuery] = useState("");

  const findMovies = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) { // Проверка на пустой запрос
      const results = await searchMovie(query);
      setMovies(results || []);
      updateQuery("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(e.target.value);
  };

  return (
    <form onSubmit={findMovies}>
      <input
        type="text"
        value={query}
        className='search-bar'
        placeholder="Type to search..."
        onChange={handleInputChange}
      />
    </form>
  );
}
