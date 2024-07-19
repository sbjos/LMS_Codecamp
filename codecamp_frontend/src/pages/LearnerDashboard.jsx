import { useState, useEffect } from "react";
import axios from "axios";
import LearnerMapping from "../components/LearnerMapping";
import Validate from "../components/Validate";
import "../css/Dashboard.css";
import RedirectUrl from "../components/RedirectUrl";

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
      <section className="section-1">
        <div className="welcome-section-text">
          <div className="welcome-section-text-head">
            <p>Hey {authorityArray[1]},</p>
            <p>Welcome to your learning dashboard!</p>
            <hr />
            <div className="welcome-section-btn">
              <a
                href={RedirectUrl.newAssignment}
                className="btn btn-warning"
                role="button"
              >
                Create a new assignment
              </a>
              <a href="#" className="btn btn-light" role="button">
                Request a One on One
              </a>
            </div>
          </div>
        </div>
        <div className="welcome-section-image"></div>
      </section>
      <section className="section-2">
        <div className="empty-section"></div>
      </section>
      <section className="section-3">
        <div className="assignments-container">
          <div className="label-container">
            <label>Submitted</label>
          </div>
          <ul className="card-container">
            {LearnerMapping(
              submitted,
              "card text-center p-3 border border-info card-custom",
              "btn btn-outline-info"
            )}
          </ul>

          <hr className="separation-line" />

          <div className="label-container">
            <label>In review</label>
          </div>
          <ul className="card-container">
            {LearnerMapping(
              assignments.filter((item) => item.status === "In review"),
              "btn btn-outline-warning"
            )}
          </ul>

          <hr className="separation-line" />

          <div className="label-container">
            <label>Needs work</label>
          </div>
          <ul className="card-container">
            {LearnerMapping(
              assignments.filter((item) => item.status === "Needs work"),

              "btn btn-outline-danger"
            )}
          </ul>

          <hr className="separation-line" />

          <div className="label-container">
            <label>Completed</label>
          </div>
          <ul className="card-container">
            {LearnerMapping(
              assignments
                .filter((item) => item.status === "Completed")
                .slice(-4),

              "btn btn-outline-success"
            )}
          </ul>
          <div className="showall"></div>
        </div>
      </section>
    </>
  );
}

export default LearnerDashboard;
