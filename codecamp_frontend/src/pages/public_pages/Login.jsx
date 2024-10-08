import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RedirectUrl from "../../components/RedirectUrl";
import "../../css/Login.css";
import Logo from "../../components/Logo";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
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

      if (authorityArray[4] === "[LEARNER]") {
        navigate(RedirectUrl.learnerdashboard);
      }
      if (authorityArray[4] === "[REVIEWER]") {
        navigate(RedirectUrl.reviewerDashboard);
      }
      if (authorityArray[4] === "[ADMIN]") {
        navigate(RedirectUrl.adminDashboard);
      }
    } catch (err) {
      if (!err) {
        console.error("No Server Response");
      } else {
        console.error(err);
        setError(true);
      }
    }
  };

  return (
    <>
      <div className="login-root">
        <section className="login-section-1">
          <div className="login-section-1-container">
            <div className="login-logo">{Logo(RedirectUrl.Homepage)}</div>
            <div className="login-buttons"></div>
          </div>
        </section>
        <section className="login-section-2">
          <div className="login-container">
            <div className="login-header">
              <h1>Login</h1>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-input-container"></div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label ">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
                  aria-describedby="emailHelp"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
                <div id="emailHelp" className="form-text">
                  {/* We'll never share your email with anyone else. */}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              {error ? (
                <div className="error login-error">Login failed. Try again</div>
              ) : null}
              <div className="login-btn-container">
                <button
                  type="submit"
                  className="btn btn-success login-btn-custom"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
