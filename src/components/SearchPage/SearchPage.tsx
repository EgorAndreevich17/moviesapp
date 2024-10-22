import { useState } from 'react'
import { Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import { Movie } from '../../models/Movie'
import MovieBox from '../MovieBox/MovieBox'
import SearchBar from '../SearchBar/SearchBar'
import MoviesAPI from '../../services/MoviesAPI'

import './SearchPage.scss'

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const api = new MoviesAPI()

  const handleSearch = async (query: string): Promise<Movie[]> => {
    setIsLoading(true)
    const fetchedMovies = await api.findMovie(query)
    setMovies(fetchedMovies)
    setIsLoading(false)
    return fetchedMovies
  }

  return (
    <div className="body-wrapper">
      <SearchBar searchMovie={handleSearch} setMovies={setMovies} />
      <div className="grid-container">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <MovieBox
              key={Number(movie.id)}
              moviename={movie.title}
              genres={movie.genre_ids}
              image={movie.poster_path}
              rate={movie.vote_average}
              description={movie.overview}
              date={movie.release_date}
              isLoading={isLoading}
            />
          ))
        ) : isLoading ? (
          <Spin
            className="grid-container--alert"
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          />
        ) : (
          <Alert
            className="grid-container--alert"
            type="warning"
            description="No Movies were found"
          ></Alert>
        )}
      </div>
    </div>
  )
}
