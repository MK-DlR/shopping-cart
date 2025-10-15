// main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Cart from "./cart/Cart.jsx";
import Home from "./home/Home.jsx";
import Shop from "./shop/Shop.jsx";

const router = createBrowserRouter([
  {
  path: "/",
  element: <App />,
  children: [
    { index: true, element: <Home /> }, // <-- default route
    { path: "home", element: <Home /> },
    { path: "shop", element: <Shop /> },
    { path: "cart", element: <Cart /> }
  ]
}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
