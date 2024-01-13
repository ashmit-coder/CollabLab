import { logout } from "../Controllers/TokenFuncitons";

export default function Navbar(props: { authenticated: boolean }) {
  if (props.authenticated) {
    return (
      <div id="Navbar">
        <div></div>
        <a href="/" className="Links">
          <h3>CollabLab</h3>
        </a>
        <a href="/signin" onClick={logout} className="Links">
          <h3>Logout</h3>
        </a>
      </div>
    );
  }
  return (
    <div id="Navbar">
      <div></div>

      <a href="/" className="Links">
        <h1>CollabLab</h1>
      </a>

      <a href="/signin" className="Links">
        <h3>SignIn</h3>
      </a>
    </div>
  );
}
