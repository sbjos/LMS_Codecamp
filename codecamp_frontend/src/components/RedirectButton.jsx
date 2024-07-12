import { useNavigate } from "react-router-dom";

function RedirectButton({ reference, buttonName, data, classname }) {
  const navigate = useNavigate();
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const authorityArray = userAuthority.split(", ");
  const urlPathVariable = authorityArray[1] + authorityArray[2];
  const learnerRootUrl = "/codecamp/dashboard/" + urlPathVariable;
  const reviewerRootUrl = "/codecamp/reviewerdashboard/" + urlPathVariable;

  console.log("urlPathVariable", urlPathVariable);
  const handleRedirect = () => {
    switch (reference) {
      case "logout":
        localStorage.clear();
        navigate("/codecamp/login");
        break;
      case "learner-dashboard":
        navigate(learnerRootUrl);
        break;
      case "learner-assignment-view":
        navigate(learnerRootUrl + "/assignment/" + data);
        break;
      case "learner-submit-assignment":
        if (data.length >= 4) {
          alert("You can only have 4 unassigned assignments at a time.");
        } else {
          navigate("submitassignment");
        }
        break;
      case "reviewer-dashboard":
        navigate(reviewerRootUrl);
        break;
      case "reviewer-assignment-view":
        navigate(reviewerRootUrl + "/assignment/" + data);
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
