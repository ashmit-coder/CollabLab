import Keycloak from "keycloak-js";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Whiteboard from "./pages/Whiteboard";
import LandingPage from "./pages/LandingPage";

const keycloak = new Keycloak({
  url: "http://localhost:8180",
  realm: "test",
  clientId: "ashmit",
});

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

const user = keycloak.init({ onLoad: "login-required" });

function App() {
  user.then((_data) => {
    console.log(JSON.parse(JSON.stringify(keycloak.idTokenParsed)));
  });
  return <RouterProvider router={router} />;
}

export default App;
