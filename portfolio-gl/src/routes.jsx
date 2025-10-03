import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Start from "./pages/Start";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound"; // <-- add this

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />, // catches thrown route errors
    children: [
      { index: true, element: <Start /> },             // "/"
      { path: "portfolio", element: <Portfolio /> },   // "/portfolio"
      { path: "*", element: <NotFound /> },            // anything else under "/"
    ],
  },
]);
