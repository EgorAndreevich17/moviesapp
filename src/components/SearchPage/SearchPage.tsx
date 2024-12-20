import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Alert } from 'antd'
// import { useEffect } from 'react'
import { format } from 'date-fns'

import Pages from '../Pages/Pages'
import MovieBox from '../MovieBox/MovieBox'
import SearchBar from '../SearchBar/SearchBar'
import { useMovies } from '../../context/MovieContext'

import './SearchPage.scss'

export default function SearchPage() {
  const { movies, isLoading } = useMovies()

  // useEffect(() => {
  //   movies.map((movie) => console.log(movie.release_date))
  // })

  return (
    <div className="body-wrapper">
      <SearchBar />
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
              isRatedTab={false}
              date={
                movie.release_date
                  ? String(format(new Date(movie.release_date), 'MMMM d, yyyy'))
                  : 'Release date is unknown'
              }
              // date={movie.release_date}
              id={movie.id}
              isLoading={isLoading}
            />
          ))
        ) : isLoading ? (
          <Spin className="grid-container--alert" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        ) : (
          <Alert className="grid-container--alert" type="warning" description="No Movies were found" />
        )}
      </div>
      <Pages />
    </div>
  )
}
