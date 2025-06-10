import { Link } from "react-router-dom";
import './App.css';

function MainPage() {
  return (
    <div className="mainpageDiv">
      <div className="mainDiv">
        <h1 className="title">NEARBY CAFES</h1>
        <ul>
          <li className="SearchLink">
            <Link to="/SearchCafeList">Search for nearby cafes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainPage;