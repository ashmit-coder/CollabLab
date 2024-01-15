import Navbar from "../components/Navbar";
import { isAuthenticated } from "../Controllers/TokenFuncitons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { setToken } from "../Controllers/TokenFuncitons";

export default function SigninPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/mainpage");
    }
  }, [navigate]);

  //eslint-disable-next-line
  function handleSignin(data: any): void {
    data.preventDefault();

    const email: string = data.target.elements.email.value;
    const password: string = data.target.elements.password.value;

    const auth = axios.post(`${import.meta.env.VITE_BACKEND_URL}api/login`, {
      email: email,
      password: password,
    });

    auth
      .then((data) => {
        const { token } = data.data;
        setToken(token);
        navigate("/mainpage");
      })
      .catch((error) => {
        window.alert(error.response.data.message || "Error in the given data");
        return;
      });
  }
  return (
    <div>
      <Navbar authenticated={false} />
      <form className="signup-form" onSubmit={handleSignin}>
        <h2>Sigin to Account</h2>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="password" />
        </div>
        <button type="submit">Sign In</button>
        <div className="from-group" id="form-change">
          Don't have an account{" "}
          <a className="urls" href="/signup">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
