import { Pagination } from 'antd'

import { useMovies } from '../../context/MovieContext'

export default function Pages() {
  const { page, totalPages, changePage } = useMovies()

  const handlePageChange = (page: number) => {
    changePage(page)
  }

  return (
    <Pagination
      align="center"
      current={page}
      total={totalPages}
      onChange={handlePageChange}
    />
  )
}
