import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Whiteboard from "./pages/Whiteboard";
import LandingPage from "./pages/LandingPage";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
