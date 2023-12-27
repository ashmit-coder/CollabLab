import Keycloak from "keycloak-js";
import "./App.css";
import ToolArray from "./components/ToolArray";

const keycloak = new Keycloak({
  url: "http://localhost:8180",
  realm: "test",
  clientId: "ashmit",
});

keycloak.init({ onLoad: "login-required" });

function App() {
  return (
    <div>
      <ToolArray />
      <canvas id="Main-canvas" />
    </div>
  );
}

export default App;
