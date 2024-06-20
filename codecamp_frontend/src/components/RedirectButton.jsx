import { useNavigate } from "react-router-dom";

function RedirectButton(value, button, data) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    switch (value) {
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
        if (data.length < 4) {
          navigate("/api/submitassignment");
        } else {
          alert("You can only have 4 unassigned assignments at a time.");
        }
        break;
      case "reviewer":
        navigate("/api/reviewer/dashboard");
        break;
      case "reviewer-assignment-view":
        navigate("/api/reviewer/assignment/:id");
        break;
    }
  };

  return <button onClick={handleRedirect}>{button}</button>;
}

export default RedirectButton;
