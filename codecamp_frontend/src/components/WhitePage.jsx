import { useNavigate } from "react-router-dom";
import Validate from "./Validate";
import RedirectUrl from "./RedirectUrl";

function WhitePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");

  const status = Validate(token, userAuthority);

  if (!status) {
    setTimeout(() => {}, 1000);
  }

  setTimeout(() => {
    if (status === 200) {
      const authority = userAuthority.split(", ");

      if (authority[4] === "[LEARNER]") {
        navigate(RedirectUrl.learnerdashboard);
        // window.location.replace(RedirectUrl.learnerdashboard)
      }
      if (authority[4] === "[REVIEWER]") {
        navigate(RedirectUrl.reviewerDashboard);
        // window.location.replace(RedirectUrl.reviewerDashboard);
      }
      if (authority[4] === "[ADMIN]") {
        navigate(RedirectUrl.adminDashboard);
        // window.location.replace(RedirectUrl.adminDashboard);
      }
    } else {
      navigate("/codecamp/login");
      // window.location.replace("/codecamp/login");
    }
  }, 500);
}

export default WhitePage;
