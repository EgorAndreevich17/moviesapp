import { useState} from "react";
import { Movie } from "../../models/Movie";
import MovieBox from "../MovieBox/MovieBox";
import SearchBar from "../SearchBar/SearchBar";
import MoviesAPI from "../../services/MoviesAPI";
import SectionsSwitcher from "../SectionsSwitcher/SectionsSwitcher";
import "./Body.scss";

export default function Body() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const api = new MoviesAPI();
  const [switcher, setSwitcher] = useState("search");

  const handleSearch = async (query: string): Promise<Movie[]> => {
    setIsLoading(true);
    const fetchedMovies = await api.findMovie(query);
    setMovies(fetchedMovies);
    setIsLoading(false);
    return fetchedMovies;
  };

  return (
    <div className="body-wrapper">
      <SectionsSwitcher
        switcherState={switcher}
        onSwitcherChange={(state) => setSwitcher(state)}
      />
      <SearchBar searchMovie={handleSearch} setMovies={setMovies} />
      <div className="grid-container">
        {switcher === "search" ? (
          movies && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieBox
                key={Number(movie.id)}
                moviename={movie.title}
                genres={movie.genre_ids}
                image={movie.poster_path}
                description={movie.overview}
                date={movie.release_date}
                isLoading={isLoading} // Передаём состояние загрузки
              />
            ))
          ) : isLoading ? (
            <p>Loading...</p> // Показываем текст загрузки, если нет фильмов
          ) : (
            <p>No movies found</p>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
