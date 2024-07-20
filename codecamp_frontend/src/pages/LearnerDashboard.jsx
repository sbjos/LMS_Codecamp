import { useState, useEffect } from "react";
import axios from "axios";
import LearnerMapping from "../components/LearnerMapping";
import Validate from "../components/Validate";
import RedirectUrl from "../components/RedirectUrl";
import "../css/Dashboard.css";

function LearnerDashboard() {
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const authorityArray = userAuthority ? userAuthority.split(", ") : "";

  // Validate a user's access to a webpage
  Validate(token, userAuthority);

  /**
   * automatically fetches and loads assignments by user
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
        }
      }
    };
    fetchData();
  }, []);

  const submitted = assignments.filter((item) => item.status === "Submitted");

  // Passes the data to the ReviewerMapping.jsx component to handle cards.
  return (
    <>
      {/* section-1 */}
      <section className="section-1">
        <div className="welcome-section-text">
          <div className="welcome-section-text-head">
            <p>Hey {authorityArray[1]},</p>
            <div className="welcome-section-text-body">
              <p>Welcome to your assignment dashboard!</p>
            </div>
          </div>
          <hr />
          <div className="welcome-section-text-btn">
            <a
              href={RedirectUrl.newAssignment}
              className="btn btn-warning btn-sm"
              role="button"
            >
              Create new assignment
            </a>
            <a href="#" className="btn btn-light btn-sm" role="button">
              Request One on One
            </a>
          </div>
        </div>
      </section>

      {/* section-2 */}
      <section className="section-2">
        <div className="empty-section"></div>
      </section>

      {/* section-3 */}
      <section className="section-3">
        <div className="card-container" id="submitted-container">
          <label>Submitted</label>
          <ul className="card-list">{LearnerMapping(submitted.slice(-4))}</ul>
        </div>

        <hr className="separation-line" />

        <div className="card-container" id="inreview-container">
          <label>In review</label>
          <ul className="card-list">
            {LearnerMapping(
              assignments
                .filter((item) => item.status === "In review")
                .slice(-4)
            )}
          </ul>
        </div>

        <hr className="separation-line" />

        <div className="card-container" id="needswork-container">
          <label>Needs work</label>
          <ul className="card-list">
            {LearnerMapping(
              assignments
                .filter((item) => item.status === "Needs work")
                .slice(-4)
            )}
          </ul>
        </div>

        <hr className="separation-line" />

        <div className="card-container" id="completed-container">
          <label>Completed</label>
          <ul className="card-list">
            {LearnerMapping(
              assignments
                .filter((item) => item.status === "Completed")
                .slice(-4)
            )}
          </ul>
        </div>
        <div className="showall"></div>
      </section>
    </>
  );
}

export default LearnerDashboard;
