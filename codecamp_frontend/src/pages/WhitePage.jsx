import { useNavigate } from "react-router-dom";
import Validate from "../components/Validate";

function WhitePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");

  const status = Validate(token, userAuthority);

  if (userAuthority && token && status === 200) {
    const authority = userAuthority.split(", ");
    const userNamePathVariable = authority[1] + authority[2];

    if (authority[4] === "[LEARNER]") {
      navigate("/codecamp/" + urlPathVariable + "/dashboard/");
    }
    if (authority[4] === "[REVIEWER]") {
      navigate("/codecamp/reviewer/dashboard/" + userNamePathVariable);
    }
    if (authority[4] === "[ADMIN]") {
      navigate("/codecamp/admin/" + userNamePathVariable);
    }
  } else {
    navigate("/codecamp/login");
  }

  return <></>;
}

export default WhitePage;
