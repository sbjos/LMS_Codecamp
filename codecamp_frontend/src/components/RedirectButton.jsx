import { useNavigate } from "react-router-dom";

function RedirectButton({ reference, buttonName, data, classname }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    switch (reference) {
      case "logout":
        localStorage.clear();
        navigate("/api/auth/login");
        break;
      case "learner-dashboard":
        navigate("/api/dashboard");
        break;
      case "learner-assignment-view":
        navigate("/api/assignment/" + data);
        break;
      case "learner-new-assignment":
        if (data.length >= 4) {
          alert("You can only have 4 unassigned assignments at a time.");
        } else {
          navigate("/api/submitassignment");
        }
        break;
      case "reviewer-dashboard":
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

  return (
    <button className={classname} onClick={handleRedirect}>
      {buttonName}
    </button>
  );
}

export default RedirectButton;
