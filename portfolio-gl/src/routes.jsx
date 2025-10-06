import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Start from "./pages/Start";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />, 
    children: [
      { index: true, element: <Start /> },          
      { path: "portfolio", element: <Portfolio /> }, 
      { path: "*", element: <NotFound /> },       
    ],
  },
]);
