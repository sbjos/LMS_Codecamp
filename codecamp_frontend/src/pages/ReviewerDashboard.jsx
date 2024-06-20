import { useState, useEffect } from "react";
import axios from "axios";
import ReviewerMapping from "../components/ReviewerMapping";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/Dashboard.css";

function ReviewerDashboard() {
  const logout = RedirectButton("logout", "Logout");
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority
    ? cleanUserAuthority.split(", ")
    : "";
  const user = authorityArray[0];

  /**
   * Validate a user's access to a webpage.
   */
  Validate(token, cleanUserAuthority);

  /**
   * automatically fetches and loads all assignments.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("lmsusertoken");
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        console.log(response.data); // TODO: Remove
        setAssignments(response.data.map((item) => item.assignment));
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else {
          console.error(err);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard-header">
        <h1>{user}'s Dashboard</h1>
      </div>
      <div className="dashboard-navbar">
        <p>{logout}</p>
      </div>

      <hr className="separationline" />

      <div className="assignments-container">
        <div className="label-container">
          <label htmlFor="Submitted">Submitted</label>
        </div>
        <ul className="card-container-submit">
          {ReviewerMapping(
            assignments.filter((item) => item.status === "Submitted").slice(-4),
            token
          )}
        </ul>
        <div>
          <a className="showall" href="/api/reviewer/dashboard/allsubmitted">
            show all submitted assignments
          </a>
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
                item.codeReviewer.username == user
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
                  item.codeReviewer.username == user
              )
              .slice(-4),
            token
          )}
        </ul>
        <div>
          <a className="showall" href="/api/reviewer/dashboard/allcompleted">
            show all completed
          </a>
        </div>
      </div>
    </>
  );
}

export default ReviewerDashboard;
