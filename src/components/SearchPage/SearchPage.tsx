import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Alert } from 'antd'

import Pages from '../Pages/Pages'
import MovieBox from '../MovieBox/MovieBox'
import SearchBar from '../SearchBar/SearchBar'
import { useMovies } from '../../context/MovieContext'

import './SearchPage.scss'

export default function SearchPage() {
  const { movies, page, isLoading, searchMovies } = useMovies()

  const handleSearchMovies = async (query: string) => {
    await searchMovies(query, page)
  }

  return (
    <div className="body-wrapper">
      <SearchBar searchMovie={handleSearchMovies} />
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
          />
        )}
      </div>
      <Pages />
    </div>
  )
}
