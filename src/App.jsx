// App.jsx

import { useState } from "react";
import { Outlet } from "react-router";
import Navigation from "./navigation/Navigation";

const App = () => {
  const [cartArray, setCartArray] = useState([]);
  
  return (
    <div>
      <Navigation cartCount={cartArray.length} />
      <Outlet context={{ cartArray, setCartArray }} />
    </div>
  );
};

export default App;
