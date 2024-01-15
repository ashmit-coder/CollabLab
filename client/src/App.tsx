import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Whiteboard from "./pages/Whiteboard";
import LandingPage from "./pages/LandingPage";
import SinginPage from "./pages/SigninPage";
import SinnupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  {
    errorElement: <div id="error">PAGE NOT FOUND, 404</div>,
  },
  {
    path: "/whiteboard",
    element: <Whiteboard />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signin",
    element: <SinginPage />,
  },
  {
    path: "/signup",
    element: <SinnupPage />,
  },
  {
    path:"/mainpage",
    element:<MainPage/>
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
