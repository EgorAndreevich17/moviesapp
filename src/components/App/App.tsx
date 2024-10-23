import { Tabs } from 'antd'

import SearchPage from '../SearchPage/SearchPage'
import MovieProvider from '../../context/MovieContext'
import './App.scss'

function App() {
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
              children: '',
            },
          ]}
        />
      </div>
    </MovieProvider>
  )
}

export default App
