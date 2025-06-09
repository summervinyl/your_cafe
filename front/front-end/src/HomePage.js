import { Link } from "react-router-dom";
import './App.css';

function HomePage() {
  return (
    <div className="homepageDiv">
      <div className="mainDiv">
        <h1 className="title">Nearby Cafes</h1>
        <ul>
          <li className="SearchLink">
            <Link to="/SearchCafeList">Search for nearby cafes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;