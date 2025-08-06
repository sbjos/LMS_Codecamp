import { Outlet, useNavigate } from "react-router-dom";
import RedirectUrl from "../RedirectUrl";
import Validate from "../Validate";
import LearnerHeader from "../LearnerHeader";
import Footer from "../Footer";
import "../../css/Footer.css";
import "../../css/LearnerHeader.css";

function LearnerRootOutlet() {
  Validate();
  const navigate = useNavigate();
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const authorityArray = userAuthority ? userAuthority.split(", ") : "";
  const name = authorityArray[1] + " " + authorityArray[2];

  const Logout = () => {
    localStorage.clear();
    navigate("/codecamp/login");
  };

  return (
    <>
      <div>
        <LearnerHeader />
      </div>
      <main className="main">
        <Outlet />
      </main>
      <div className="dashboard-footer">
        <Footer />
      </div>
    </>
  );
}

export default LearnerRootOutlet;
