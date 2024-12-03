import { createContext, useState, useContext, useEffect, ReactNode } from 'react'

import { Movie } from '../models/Movie'

interface Genre {
  id: number
  name: string
}

interface MovieContextType {
  genres: Genre[]
  movies: Movie[]
  ratedMovies: Movie[]
  page: number
  totalPages: number
  url: string
  isLoading: boolean
  query: string
  guestSessionID: string
  searchMovies: (newQuery: string, newPage?: number) => void
  createGuestSession: () => Promise<string>
  rateMovie: (movieID: number, rate: number) => void
  getRatedMovies: () => void
  changePage: (newPage: number) => void
  setQuery: (newQuery: string) => void
  setGuestSessionID: (newSessionID: string) => void
  getGenreNames: (genreIds: number[]) => string[]
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

interface MovieProviderProps {
  children: ReactNode
}

const BASE_URL = 'https://api.themoviedb.org/3/'
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTZkMzU3MTczMWFlYWYxZmFjYzhjMjAzOGM2MDdmYSIsIm5iZiI6MTcyOTA5MjYxOS4yMTE1MDMsInN1YiI6IjY3MGVhZWUzYjE1ZDk3YjFhOTNkYjNlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LOy3-VSdI4l34928pDXXdF8m-BUPpfCwU4dCw-kKi6c'

export default function MovieProvider({ children }: MovieProviderProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [url, updateURL] = useState<string>(BASE_URL)
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState<string>('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [guestSessionID, setGuestSessionID] = useState<string>('')

  let currentRequestId = 0
  // let [isCreatingGuestSession, setIsCreatingGuestSession] = useState(false)

  // const validateGuestSession = async (
  //   guestSessionID: string
  // ): Promise<boolean> => {
  //   const requestURL = `${BASE_URL}authentication/guest_session/${guestSessionID}`
  //   try {
  //     const response = await fetch(requestURL, {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: `Bearer ${API_KEY}`,
  //       },
  //     })

  //     if (!response.ok) {
  //       return false
  //     }

  //     const data = await response.json()
  //     console.log('Гостевая сессия валидна:', data)
  //     return true
  //   } catch (error) {
  //     console.error('Ошибка проверки гостевой сессии:', error.message)
  //     return false
  //   }
  // }

  const ensureGuestSession = (() => {
    let sessionPromise: Promise<string> | null = null

    return async (): Promise<string> => {
      if (guestSessionID) {
        // console.log(`Существующая гостевая сессия: ${guestSessionID}`)
        return guestSessionID
      }

      if (sessionPromise) {
        // console.log('Ожидание текущего запроса на создание сессии...')
        return sessionPromise
      }

      sessionPromise = (async () => {
        // console.log('Создаём новую гостевую сессию...')
        const requestURL = `${BASE_URL}authentication/guest_session/new`

        try {
          const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            },
          })

          if (!response.ok) {
            throw new Error('Ошибка создания гостевой сессии')
          }

          const data = await response.json()
          if (!data.success) {
            throw new Error('Ошибка API при создании гостевой сессии')
          }

          // console.log(`Создана новая гостевая сессия: ${data.guest_session_id}`)
          setGuestSessionID(data.guest_session_id)
          return data.guest_session_id
        } finally {
          sessionPromise = null // Освобождаем обещание после завершения
        }
      })()

      return sessionPromise
    }
  })()

  // const fetchGenres = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}genre/movie/list`, {
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: `Bearer ${API_KEY}`,
  //       },
  //     })
  //     if (!response.ok) throw new Error('Не удалось загрузить жанры')
  //     const data = await response.json()
  //     setGenres(data.genres || [])
  //   } catch (error) {
  //     console.error('Ошибка загрузки жанров:', error)
  //   }
  // }

  const getGenreNames = (genreIds: number[]): string[] => {
    return genreIds.map((id) => genres.find((genre) => genre.id === id)?.name).filter(Boolean) as string[]
  }

  // const createGuestSession = async (): Promise<string> => {
  //   const requestURL = `${BASE_URL}authentication/guest_session/new`
  //   const response = await fetch(requestURL, {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: `Bearer ${API_KEY}`,
  //     },
  //   })

  //   if (!response.ok) {
  //     throw new Error(`Ошибка запроса: ${response.status}`)
  //   }

  //   const data = await response.json()
  //   if (!data.success) {
  //     throw new Error('Не удалось создать гостевую сессию')
  //   }

  //   console.log(`Создана новая гостевая сессия: ${data.guest_session_id}`)
  //   return data.guest_session_id
  // }

  const rateMovie = async (movieID: number, rate: number) => {
    try {
      const validSessionID = await ensureGuestSession()
      // console.log(`Используем гостевую сессию для оценки: ${validSessionID}`)

      const requestURL = `${BASE_URL}movie/${movieID}/rating?guest_session_id=${validSessionID}`

      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ value: rate }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error(`Ошибка оценки фильма: ${response.status} - ${errorData.status_message}`)
        throw new Error(errorData.status_message)
      }

      // console.log('Успешно оценен фильм.')

      const movieResponse = await fetch(`${BASE_URL}movie/${movieID}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      })

      if (!movieResponse.ok) {
        throw new Error(`Ошибка получения данных о фильме: ${movieResponse.status}`)
      }

      const movieData = await movieResponse.json()
      // console.log('Данные о фильме после оценки:', movieData)

      setRatedMovies((prevRatedMovies) => {
        const alreadyRated = prevRatedMovies.some((movie) => movie.id === movieData.id)
        if (alreadyRated) {
          return prevRatedMovies
        }
        return [...prevRatedMovies, movieData]
      })
    } catch (error) {
      console.error('Ошибка при оценке фильма:', error)
    }
  }

  const getRatedMovies = async () => {
    const validSessionID = await ensureGuestSession()

    // console.log(
    //   `Используем гостевую сессию для получения оцененных фильмов: ${validSessionID}`
    // )

    const requestURL = `${BASE_URL}guest_session/${validSessionID}/rated/movies`

    try {
      const response = await fetch(requestURL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error(`Ошибка запроса: ${response.status} - ${errorData.status_message}`)
        throw new Error(errorData.status_message)
      }

      const data = await response.json()
      // console.log('Получены оцененные фильмы:', data.results)

      setRatedMovies(data.results || [])
    } catch (error) {
      console.error('Ошибка при получении оцененных фильмов:', error.message)
    }
  }

  const searchMovies = async (newQuery: string, newPage: number = 1) => {
    setPage(newPage)
    setIsLoading(true)
    setQuery(newQuery)

    const newURL = `${BASE_URL}search/movie?query=${newQuery}&include_adult=false&language=en-US`
    updateURL(newURL)

    const searchUrl = `${newURL}&page=${newPage}`
    try {
      const requestId = ++currentRequestId
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`)
      }

      const data = await response.json()

      if (requestId !== currentRequestId) {
        return
      }

      // console.log(data.results)
      setMovies(data.results || [])
      setTotalPages(data.total_pages || 0)
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const changePage = async (newPage: number) => {
    await searchMovies(query, newPage)
  }
  useEffect(() => {
    const initializeGuestSession = async () => {
      try {
        const sessionID = await ensureGuestSession()
        setGuestSessionID(sessionID)
        // console.log('Инициализация гостевой сессии завершена.')
        // await getRatedMovies()
      } catch (error) {F
        console.error('Ошибка инициализации гостевой сессии:', error)
      }
    }

    initializeGuestSession()
  }, [])

  return (
    <MovieContext.Provider
      value={{
        movies,
        ratedMovies,
        page,
        totalPages,
        guestSessionID,
        url,
        isLoading,
        query,
        setQuery,
        searchMovies,
        changePage,
        getRatedMovies,
        rateMovie,
        // setGuestSessionID,
        getGenreNames,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export const useMovies = () => {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider')
  }
  return context
}
