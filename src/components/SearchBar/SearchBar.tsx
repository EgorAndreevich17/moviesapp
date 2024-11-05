import React, { useState } from 'react'
import { Input } from 'antd'

import { useMovies } from '../../context/MovieContext'
import './SearchBar.scss'

export default function SearchBar() {
  const { searchMovies } = useMovies()

  const [query, updateQuery] = useState('')

  // const findMovies = async (e: React.FormEvent) => {
  //   if (query.trim()) {
  //     await debouncedFindMovie(query, 1)
  //     updateQuery('') // Очищаем поле поиска
  //   } else {
  //     clearDebounce()
  //   }
  // }
  const debounce = function <A = unknown, R = void>(
    // eslint-disable-next-line no-unused-vars
    fn: (args: A) => R
    // eslint-disable-next-line no-unused-vars
  ): [(args: A) => Promise<R>, () => void] {
    let timer: ReturnType<typeof setTimeout> | null = null

    const debouncedFunc = (args: A): Promise<R> =>
      new Promise((resolve) => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          resolve(fn(args))
        }, 5000)
      })
    const teardown = () => {
      if (timer) clearTimeout(timer)
    }
    return [debouncedFunc, teardown]
  }

  const [debouncedFindMovie, clearDebounce] = debounce(searchMovies)

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(e.target.value)
    if (e.target.value.trim()) {
      await debouncedFindMovie(e.target.value)
    } else {
      clearDebounce()
    }
  }

  const { Search } = Input
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Search
        type="text"
        value={query}
        className="search-bar"
        placeholder="Type to search..."
        onChange={handleInputChange}
      />
    </form>
  )
}
