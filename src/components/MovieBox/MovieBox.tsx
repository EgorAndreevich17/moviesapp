import './MovieBox.scss'
import { useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Rate } from 'antd'

import { useMovies } from '../../context/MovieContext'

interface MovieBoxProps {
  moviename: string
  genres: number[] // список ID жанров
  image: string
  description: string
  date: string
  rate: number
  id: number
  isLoading: boolean
  isRatedTab: boolean
}

export default function MovieBox({
  moviename = 'Movie Name',
  genres = [],
  image = '',
  rate = 0,
  description = 'description',
  date = '04/20/1488',
  id,
  isLoading,
  isRatedTab,
}: MovieBoxProps) {
  const { rateMovie, genres: genreList } = useMovies() // Достаем список жанров из контекста
  const [myRate, setMyRate] = useState(0)

  const hangleRateMovie = (id: number, value: number) => {
    setMyRate(value)
    rateMovie(id, value)
  }

  const imageUrl = image ? `https://image.tmdb.org/t/p/w500${image}` : 'default.jpg'

  const shortenDescription = (text: string) => {
    const maxLength: number = 250
    if (text.length < maxLength) return text
    return `${text.slice(0, maxLength)}...`
  }

  const genreNames = genres
    .map((genreID) => (genreList ? genreList.find((genre) => genre.id === genreID)?.name : undefined))
    .filter((name): name is string => !!name)

  return (
    <div className="movie-wrapper">
      {isLoading ? (
        <div className="spinner-box">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <>
          <div className="movie-wrapper__image-box">
            {image ? (
              <img className="movie-wrapper__image" src={imageUrl} alt={moviename} />
            ) : (
              <div>
                <img className="movie-wrapper__image" src="src/assets/Default_Background_Art.jpg" />
                <p className="movie-wrapper__image--title">{moviename}</p>
              </div>
            )}
          </div>
          <div className="movie-wrapper__content movie-content">
            <div className="movie-content__title-wrapper">
              <h5 className="movie-content__header">{moviename}</h5>
              <div
                // className="movie-content__rate"
                className={`movie-content__rate 
              ${
                Number(rate.toFixed(1)) <= 3
                  ? 'movie-content__rate--shit'
                  : Number(rate.toFixed(1)) <= 5
                    ? 'movie-content__rate--average'
                    : Number(rate.toFixed(1)) <= 7
                      ? 'movie-content__rate--good'
                      : 'movie-content__rate--masterpiece'
              }`}
              >
                {rate.toFixed(1)}
              </div>
            </div>
            <p className="movie-content__date">{date}</p>
            <div className="movie-content__genres">
              {genreNames.map((name, index) => (
                <div key={index} className={`movie-content__genres--${index + 1}`}>
                  {name}
                </div>
              ))}
            </div>
            <div className="movie-content__description">{shortenDescription(description)}</div>
            <Rate
              value={isRatedTab ? rate : myRate}
              disabled={isRatedTab}
              onChange={(value) => hangleRateMovie(id, value)}
              count={10}
              allowHalf
              className={'custom-rate'}
            />
          </div>
        </>
      )}
    </div>
  )
}
