import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Validate from "../components/Validate";
import "../css/PublicHomepage.css";
import { useEffect } from "react";

// function PublicHomepage() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("lmsusertoken");
//   const userAuthority = localStorage.getItem("lmsuserauthorities");

//   const handleClick = () => {
//     navigate("/codecamp/login");
//   };

//   return (
//     <>
//       <div>
//         <div className="header">
//           <h1>Welcome to the assignment review app</h1>
//         </div>
//         <div className="login-burger">
//           <button onClick={handleClick}>Login</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PublicHomepage;

function PublicHomepage() {
  const location = useLocation();
  return (
    <>
      <div className="header">
        <h1>Welcome to the assignment review app</h1>
      </div>
      <div className="login-burger">
        <Link to="login">
          <button>Login</button>
        </Link>
      </div>
    </>
  );
}

export default PublicHomepage;
