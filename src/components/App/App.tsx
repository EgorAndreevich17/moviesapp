import { Tabs } from 'antd'

import SearchPage from '../SearchPage/SearchPage'
import RatedPage from '../RatedPage/RatedPage'
import MovieProvider from '../../context/MovieContext'
import './App.scss'

export default function App() {
  return (
    <MovieProvider>
      <div className="parent-wrapper">
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: 'Search',
              key: '1',
              children: <SearchPage />,
            },
            {
              label: 'Rated',
              key: '2',
              children: <RatedPage />,
            },
          ]}
        />
      </div>
    </MovieProvider>
  )
}
