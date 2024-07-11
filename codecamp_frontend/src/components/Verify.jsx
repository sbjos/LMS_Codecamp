import { useNavigate } from "react-router-dom";
import Validate from "./Validate";

function Verify() {
  const navigate = useNavigate("");
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");

  if (userAuthority && token) {
    if (Validate(token, userAuthority) === 200) {
      const authority = userAuthority.split(", ");
      const userNamePathVariable = authority[1] + authority[2];

      if (authority[4] === "[LEARNER]") {
        navigate("/codecamp/dashboard/" + userNamePathVariable);
      }
      if (authority[4] === "[REVIEWER]") {
        navigate("/codecamp/reviewer/dashboard/" + userNamePathVariable);
      }
      if (authority[4] === "[ADMIN]") {
        navigate("/codecamp/admin/" + userNamePathVariable);
      }
    }
  } else {
    navigate("login");
  }
}

export default Verify;
