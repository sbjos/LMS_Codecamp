import { useNavigate } from "react-router-dom";

function RedirectButton({ reference, buttonName, data }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    switch (reference) {
      case "logout":
        localStorage.clear();
        navigate("/api/auth/login");
        break;
      case "learner":
        navigate("/api/dashboard");
        break;
      case "learner-assignment-view":
        navigate("/api/assignment/" + data);
        break;
      case "new-assignment":
        if (data.length >= 4) {
          navigate("/api/submitassignment");
        } else {
          alert("You can only have 4 unassigned assignments at a time.");
        }
        break;
      case "reviewer":
        navigate("/api/reviewer/dashboard");
        break;
      case "reviewer-assignment-view":
        navigate("/api/reviewer/assignment/" + data);
        break;
      default:
        navigate("*");
        break;
    }
  };

  return <button onClick={handleRedirect}>{buttonName}</button>;
}

export default RedirectButton;
