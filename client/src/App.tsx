import Keycloak from "keycloak-js";
import {FabricJSCanvas, useFabricJSEditor} from"fabricjs-react";
import "./App.css"
const keycloak = new Keycloak(
  {
  url: "http://localhost:8180",
  realm:"test",
  clientId: "ashmit",
  
}
);

keycloak.init({onLoad:"login-required"})

function App() {

  const {onReady,editor} = useFabricJSEditor()
  editor?.addCircle();
    
 
  return (
      <FabricJSCanvas onReady={onReady} className="Main-canvas"/>
    )
  
}

export default App
