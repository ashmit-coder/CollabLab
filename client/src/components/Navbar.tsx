export default function Navbar(props: { authenticated: boolean }) {
  if (props.authenticated) {
    return (
      <div id="Navbar">
        <div></div>
        <a href="/" className="Links">
          <h3>CollabLab</h3>
        </a>
        <a href="/" className="Links">
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

      <a href="/sigin" className="Links">
        <h3>SignIn</h3>
      </a>
    </div>
  );
}
