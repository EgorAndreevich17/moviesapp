import React, { useState } from 'react'
import { Input } from 'antd'

import { useMovies } from '../../context/MovieContext'
import './SearchBar.scss'

export default function SearchBar() {
  const { searchMovies, setQuery, query } = useMovies()
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  )

  // Для дебаунса
  const debouncedFindMovie = (newQuery: string) => {
    if (debounceTimeout) clearTimeout(debounceTimeout)

    const timeout = setTimeout(() => {
      searchMovies(newQuery)
    }, 3000)
    setDebounceTimeout(timeout)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value

    setQuery(newQuery)

    if (newQuery.trim()) {
      console.log(`updated query: ${newQuery}`)
      debouncedFindMovie(newQuery)
    } else {
      setQuery('')
      if (debounceTimeout) clearTimeout(debounceTimeout)
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
