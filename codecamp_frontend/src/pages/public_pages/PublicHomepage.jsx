import { useNavigate } from "react-router-dom";
import "../../css/PublicHomepage.css";
import RedirectUrl from "../../components/RedirectUrl";

function PublicHomepage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");

  const handleClick = () => {
    if (token && userAuthority) {
      return navigate("auth");
    } else {
      return navigate("login");
    }
  };

  return (
    <>
      <div className="publicpage-header">
        <h1>Welcome to the assignment review app</h1>
      </div>
      <div className="publicpage-body"></div>
      <div className="publicpage-buttons">
        <button className="login-burger" onClick={handleClick}>
          Login
        </button>
        <a className="register-burger" href={RedirectUrl.Register}>
          Register
        </a>
      </div>
    </>
  );
}

export default PublicHomepage;
