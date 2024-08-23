import { useNavigate } from "react-router-dom";
import RedirectUrl from "../../components/RedirectUrl";
import "../../css/PublicHomepage.css";

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
      <div className="public-root">
        <section className="public-section-1"></section>
        <section className="public-section-2">
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
        </section>
        <section className="public-section-3"></section>
      </div>
    </>
  );
}

export default PublicHomepage;
