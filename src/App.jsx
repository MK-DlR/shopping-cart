// App.jsx

import { useState, useMemo } from "react";
import { Outlet } from "react-router";
import Navigation from "./navigation/Navigation";

const App = () => {
  const [cartArray, setCartArray] = useState([]);

  const calculateCart = (cartArray) => {
    return cartArray.reduce((total, item) => total + item.quantity, 0);
  }

  // cache calculation to only recalculate when cartArray changes
  const cartQuantity = useMemo(() => calculateCart(cartArray), [cartArray]);
    
  return (
    <div>
      <Navigation cartCount={cartQuantity} />
      <Outlet context={{ cartArray, setCartArray }} />
    </div>
  );
};

export default App;
