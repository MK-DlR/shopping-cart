// App.jsx

import { Link } from "react-router";

const App = () => {
  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are links to other pages:</p>
      <nav>
        <ul>
          <li>
            <Link to="/navigation">Navigation bar</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
