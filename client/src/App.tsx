import Keycloak from "keycloak-js";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Whiteboard from "./pages/Whiteboard";

const keycloak = new Keycloak({
  url: "http://localhost:8180",
  realm: "test",
  clientId: "ashmit",
});

const router = createBrowserRouter([{
  path: "/whiteboard",
  element:<Whiteboard/>

},{
  errorElement:<div id="error">PAGE NOT FOUND, 404</div>
},
{
  path: "/",
  element:<div>HI This is home page</div>
}
])

keycloak.init({ onLoad: "login-required" });

function App() {
    return(<RouterProvider router={router} />)
}

export default App;
