import { Movie } from '../models/Movie'

export default class MoviesAPI {
  private URL = 'https://api.themoviedb.org/3/'
  private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTZkMzU3MTczMWFlYWYxZmFjYzhjMjAzOGM2MDdmYSIsIm5iZiI6MTcyOTA5MjYxOS4yMTE1MDMsInN1YiI6IjY3MGVhZWUzYjE1ZDk3YjFhOTNkYjNlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LOy3-VSdI4l34928pDXXdF8m-BUPpfCwU4dCw-kKi6c',
    },
  }

  findMovie = async (
    query: string = 'Avengers',
    page: number = 1
  ): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${this.URL}search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        this.options
      )
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
      return data.results || []
    } catch (err) {
      console.log(`Возникла ошибка при подключении к API: ${err}`)
      return []
    }
  }

  findImage = async (query: string) => {
    try {
      const response = await fetch(`${this.URL}${query}`, this.options)
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`)
      }
      const data = await response.json()
      return data.results || []
    } catch (err) {
      console.log(`Возникла ошибка при получении картинки: ${err}`)
      return []
    }
  }
}
