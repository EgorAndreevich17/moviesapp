import { createContext, useState, useContext, ReactNode } from 'react'

import { Movie } from '../models/Movie'

// interface MoviesAPIResponse {
//   results: Movie[]
//   total_pages: number
// }

interface MovieContextType {
  movies: Movie[]
  page: number
  totalPages: number
  url: string
  isLoading: boolean
  query: string
  // eslint-disable-next-line no-unused-vars
  searchMovies: (newQuery: string, newPage?: number) => void
  // eslint-disable-next-line no-unused-vars
  changePage: (newPage: number) => void
  // eslint-disable-next-line no-unused-vars
  setQuery: (newQuery: string) => void
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
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [url, updateURL] = useState<string>(BASE_URL)
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState<string>('')

  let currentRequestId = 0

  const searchMovies = async (newQuery: string, newPage: number = 1) => {
    setPage(newPage)
    setIsLoading(true)
    setQuery(newQuery)
    console.log('🔄 Query обновлён:', newQuery)

    const newURL = `${BASE_URL}search/movie?query=${newQuery}&include_adult=true&language=en-US`
    updateURL(newURL)

    const searchUrl = `${newURL}&page=${newPage}`
    try {
      const requestId = ++currentRequestId
      console.log(
        `[${requestId}] ⏳ Запрос отправлен: Query="${newQuery}" Page=${newPage}`
      )
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
        console.log(`❌ [${requestId}] Устаревший запрос, данные игнорируются.`)
        return
      }

      console.log(
        `[${requestId}] ✅ Ответ получен: Query="${query}" Page=${newPage}`
      )

      console.log('📄 Movies обновлены:', data.results)
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
    console.log('Switched to Page ', newPage)
  }

  return (
    <MovieContext.Provider
      value={{
        movies,
        page,
        totalPages,
        url,
        isLoading,
        query,
        setQuery,
        searchMovies,
        changePage,
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
