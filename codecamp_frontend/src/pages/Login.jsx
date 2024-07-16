import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate("");

  // Sumbit a request to login to application.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password }
      );

      localStorage.setItem(
        "lmsusertoken",
        response.headers.authorization.split(" ")[1]
      );
      const userAuthority = response.headers.authority.slice(1, -1);

      localStorage.setItem("lmsuserauthorities", userAuthority);

      // redirect to apropriate dashboard based on authority after successfull login
      const authorityArray = userAuthority.split(", ");
      const urlPathVariable = authorityArray[1] + authorityArray[2];

      if (authorityArray[4] === "[LEARNER]") {
        navigate("/codecamp/dashboard/" + urlPathVariable);
      }
      if (authorityArray[4] === "[REVIEWER]") {
        navigate("/codecamp/reviewerdashboard/" + urlPathVariable);
      }
      if (authorityArray[4] === "[ADMIN]") {
        navigate("/codecamp/admin/" + urlPathVariable);
      }
    } catch (err) {
      if (!err) {
        console.error("No Server Response");
      } else {
        console.error(err);
        setError("Login failed");
      }
    }
  };

  return (
    <>
      <div className="login-burger">
        <div className="login-header">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label ">
              Username
            </label>
            <input
              id="username"
              type="text"
              class="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              aria-describedby="emailHelp"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <div id="emailHelp" class="form-text">
              {/* We'll never share your email with anyone else. */}
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              class="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button
            disabled={!username || !password}
            type="submit"
            class="btn btn-success btn-login-custom"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
