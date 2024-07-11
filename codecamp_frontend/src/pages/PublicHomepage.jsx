import { useNavigate } from "react-router-dom";
import "../css/PublicHomepage.css";

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
      <div className="header">
        <h1>Welcome to the assignment review app</h1>
      </div>
      <div className="login-burger">
        <button onClick={handleClick}>Login</button>
      </div>
    </>
  );
}

export default PublicHomepage;
