import React, { useState } from 'react'
import { Input } from 'antd'

import { useMovies } from '../../context/MovieContext'
import './SearchBar.scss'

export default function SearchBar() {
  const { searchMovies } = useMovies()

  const [query, updateQuery] = useState('')

  const findMovies = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      await searchMovies(query, 1)
      updateQuery('') // Очищаем поле поиска
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(e.target.value)
  }

  const { Search } = Input
  return (
    <form onSubmit={findMovies}>
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
