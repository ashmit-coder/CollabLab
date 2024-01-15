import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../Controllers/TokenFuncitons";
import { useEffect } from "react";
import { isAuthenticated } from "../Controllers/TokenFuncitons";

export default function SignupPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/mainpage");
    }
  }, [navigate]);

  //eslint-disable-next-line
  function handleSignup(data: any): void {
    data.preventDefault();
    const name: string = data.target.elements.name.value;
    const email: string = data.target.elements.email.value;
    const password: string = data.target.elements.password.value;
    const confirm_password: string =
      data.target.elements["confirm-password"].value;

    if (password !== confirm_password) {
      window.alert("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      window.alert("Passwords should be atleast 8 char long");
      return;
    }

    const register = axios.post(
      import.meta.env.VITE_BACKEND_URL + "api/register",
      {
        name: name,
        email: email,
        password: password,
      },
    );

    register
      .then((user) => {
        const { token } = user.data;
        setToken(token);
        navigate("/mainpage");
      })
      .catch((error) => {
        window.alert(error.response.data.message || "Error in the given data");
      });
  }

  return (
    <div>
      <Navbar authenticated={false} />
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Create an Account</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" className="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="password" />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            className="confirm-password"
          />
        </div>
        <button type="submit">Sign Up</button>
        <div className="from-group" id="form-change">
          Already have an account{" "}
          <a className="urls" href="/signin">
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
}
