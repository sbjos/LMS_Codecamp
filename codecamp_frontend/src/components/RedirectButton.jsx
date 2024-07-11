import { useNavigate } from "react-router-dom";

function RedirectButton({ reference, buttonName, data, classname }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    switch (reference) {
      case "logout":
        localStorage.clear();
        navigate("/codecamp/login");
        break;
      case "learner-dashboard":
        navigate("/codecamp/dashboard/" + data);
        break;
      case "learner-assignment-view":
        navigate("assignment/" + data);
        break;
      case "learner-submit-assignment":
        if (data.length >= 4) {
          alert("You can only have 4 unassigned assignments at a time.");
        } else {
          navigate("submitassignment");
        }
        break;
      case "reviewer-dashboard":
        navigate("/codecamp/reviewer/dashboard/" + data);
        break;
      case "reviewer-assignment-view":
        navigate("/codecamp/reviewer/assignment/" + data);
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
