import { Route, Routes } from "react-router-dom";
import MainPage from './MainPage';
import SearchCafeList from './SearchCafeList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<MainPage />} />
        
        {/* SearchCafeList 페이지 */}
        <Route path="/SearchCafeList" element={<SearchCafeList />} />

        {/* 로그인 */}
      </Routes>
    </div>
  );
}

export default App;