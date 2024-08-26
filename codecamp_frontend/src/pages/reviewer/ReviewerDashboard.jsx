import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReviewerMapping from "../../components/reviewer/ReviewerMapping";
import RedirectUrl from "../../components/RedirectUrl";
// import "../css/Dashboard.css";

function ReviewerDashboard() {
  const logoutButton = <RedirectUrl reference="logout" buttonName="Logout" />;
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority.split(", ");

  /**
   * automatically fetches and loads all assignments.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        setAssignments(response.data);
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else {
          console.error(err);
          alert("Failed to retirve assignments!");
        }
      }
    };
    fetchData();
  }, []);

  // Passes the data to the ReviewerMapping.jsx component to handle cards.
  return (
    <>
      <div className="dashboard-header">
        <h1>{authorityArray[1]}'s Dashboard</h1>
      </div>
      <div className="dashboard-navbar">
        <p>{logoutButton}</p>
      </div>

      <hr className="separationline" />

      <div className="assignments-container">
        <div className="label-container">
          <label htmlFor="Submitted">Submitted</label>
        </div>
        <ul className="card-container-submit">
          {ReviewerMapping(
            assignments.filter((item) => item.status === "Submitted").slice(-4),
            token,
            authorityArray[0]
          )}
        </ul>
        <div className="showall">
          <Link to="allsubmitted">show all submitted assignments</Link>
        </div>

        <hr className="separationline" />

        <div className="label-container">
          <label htmlFor="in review">In review</label>
        </div>
        <ul className="card-container">
          {ReviewerMapping(
            assignments.filter(
              (item) =>
                item.status === "In review" &&
                item.codeReviewer.id == authorityArray[0]
            ),
            token
          )}
        </ul>

        <hr className="separationline" />

        <div className="label-container">
          <label htmlFor="completed">Completed</label>
        </div>
        <ul className="card-container">
          {ReviewerMapping(
            assignments
              .filter(
                (item) =>
                  item.status === "Completed" &&
                  item.codeReviewer.id == authorityArray[0]
              )
              .slice(-4),
            token
          )}
        </ul>
        <div className="showall">
          <Link to="allcompleted">show all completed assignments</Link>
        </div>
      </div>
    </>
  );
}

export default ReviewerDashboard;
