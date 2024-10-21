import { Tabs } from "antd";
import SearchPage from "../SearchPage/SearchPage";
import './App.scss'

function App() {
  return (
    <div className='parent-wrapper'>


      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            label: `Search`,
            key: 1,
            children: <SearchPage />,
          },
          {
            label: `Rated`,
            key: 2,
            children: ``,
          },
        ]}
      />
    </div>
  );
}

export default App;
