import { useEffect } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Alert } from 'antd'

import Pages from '../Pages/Pages'
import MovieBox from '../MovieBox/MovieBox'
import { useMovies } from '../../context/MovieContext'

export default function RatedPage() {
  const { ratedMovies, isLoading, getRatedMovies } = useMovies()
  // console.log(ratedMovies)
  useEffect(() => {
    getRatedMovies()
  }, [])
  return (
    <>
      <div className="grid-container">
        {ratedMovies && ratedMovies.length > 0 ? (
          ratedMovies.map((movie) => (
            <MovieBox
              key={Number(movie.id)}
              moviename={movie.title}
              genres={movie.genre_ids}
              image={movie.poster_path}
              // rate={movie.vote_average}
              description={movie.overview}
              date={movie.release_date}
              id={movie.id}
              isLoading={isLoading}
              rate={movie.rating}
              isRatedTab={true}
            />
          ))
        ) : isLoading ? (
          <Spin className="grid-container--alert" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        ) : (
          <Alert className="grid-container--alert" type="warning" description="No Movies were found" />
        )}
      </div>
      <Pages />
    </>
  )
}
