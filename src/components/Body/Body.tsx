import MovieBox from "../MovieBox/MovieBox";
import SearchBar from "../SearchBar/SearchBar";
import "./Body.scss";
import { useState } from "react";
import { Movie } from "../../models/Movie";
import MoviesAPI from "../../services/MoviesAPI";

export default function Body() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const api = new MoviesAPI();

  return (
    <div className="body-wrapper">
      <SearchBar searchMovie={api.findMovie} setMovies={setMovies} />
      <div className="grid-container">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <MovieBox
              key={Number(movie.id)}
              moviename={movie.title}
              genres={movie.genre_ids}
              image={movie.poster_path} 
              description={movie.overview}
              date={movie.release_date}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}
