import { Route, Routes } from "react-router-dom";
import SearchCafeList from './SearchCafeList';
import HomePage from './HomePage'; // HomePage를 별도로 생성
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 기본 페이지 */}
        <Route path="/" element={<HomePage />} />
        
        {/* SearchCafeList 페이지 */}
        <Route path="/SearchCafeList" element={<SearchCafeList />} />
      </Routes>
    </div>
  );
}

export default App;