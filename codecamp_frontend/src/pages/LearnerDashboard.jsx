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

  console.log("assignments", assignments);

  const submitted = assignments.filter((item) => item.status === "Submitted");
  const inReview = assignments.filter((item) => item.status === "In review");
  const needsWwork = assignments.filter((item) => item.status === "Needs work");
  const completed = assignments.filter((item) => item.status === "Completed");

  // Passes the data to the ReviewerMapping.jsx component to handle cards.
  return (
    <>
      <div class="dashboard-root">
        {/* section-1 */}
        <section className="dashboard-section-1">
          <div className="welcome-section-text welcome-section-text-custom">
            <div className="welcome-section-text-head">
              <p>Hey {authorityArray[1]},</p>
              <div className="welcome-section-text-body welcome-section-text-body-custom">
                <p>Welcome to your assignment dashboard!</p>
              </div>
            </div>
            <hr className="separation-line" />
            <div className="welcome-section-text-btn">
              <a
                href={RedirectUrl.newAssignment}
                className="btn btn-warning btn-md welcome-section-text-btn-new-assignment"
                role="button"
              >
                new assignment
              </a>
              <a href="#" className="btn btn-light btn-md" role="button">
                Request One on One
              </a>
            </div>
          </div>
        </section>

        {/* section-2 */}
        <section className="dashboard-section-2">
          <div className="empty-section"></div>
        </section>

        {/* section-3 */}
        <section className="dashboard-section-3">
          <div className="card-container" id="submitted-container">
            {/* desktop */}
            <div className="card-container-label-desktop" id="submitted-label">
              <label
                className="label-status"
                htmlFor="View Assignments submitted"
              >
                Assignments submitted
              </label>
              <a
                type="button"
                className="btn btn-md btn-card-container-viewall"
                href="#"
              >
                View all
              </a>
            </div>

            {/* mobile */}
            <div
              className="card-container-label-mobile"
              id="submitted-label-mobile"
            >
              <a type="button" className="btn-label-status-mobile" href="#">
                View submitted assignments
              </a>
            </div>

            <ul className="card-list">{LearnerMapping(submitted.slice(-4))}</ul>
          </div>

          <div className="card-container" id="inreview-container">
            {/* desktop */}
            <div className="card-container-label-desktop" id="inreview-label">
              <label className="label-status">Assignments in review</label>
              <a
                type="button"
                className="btn btn-md btn-card-container-viewall"
                href="#"
              >
                View all
              </a>
            </div>

            {/* mobile */}
            <div
              className="card-container-label-mobile"
              id="submitted-label-mobile"
            >
              <a type="button" className="btn-label-status-mobile" href="#">
                View assignments in review
              </a>
            </div>

            <ul className="card-list">{LearnerMapping(inReview.slice(-4))}</ul>
          </div>

          <div className="card-container" id="needswork-container">
            {/* desktop */}
            <div className="card-container-label-desktop" id="needswork-label">
              <label className="label-status">Assignments needs work</label>
              <a
                type="button"
                className="btn btn-md btn-card-container-viewall"
                href="#"
              >
                View all
              </a>
            </div>

            {/* mobile */}
            <div
              className="card-container-label-mobile"
              id="submitted-label-mobile"
            >
              <a type="button" className="btn-label-status-mobile" href="#">
                View assignments that needs work
              </a>
            </div>

            <ul className="card-list">
              {LearnerMapping(needsWwork.slice(-4))}
            </ul>
          </div>

          <div className="card-container" id="completed-container">
            {/* desktop */}
            <div className="card-container-label-desktop" id="completed-label">
              <label className="label-status">Assignments completed</label>
              <a
                type="button"
                className="btn btn-md btn-card-container-viewall"
                href="#"
              >
                View all
              </a>
            </div>

            {/* mobile */}
            <div
              className="card-container-label-mobile"
              id="submitted-label-mobile"
            >
              <a type="button" className="btn-label-status-mobile" href="#">
                View completed assignments
              </a>
            </div>

            <ul className="card-list">{LearnerMapping(completed.slice(-4))}</ul>
          </div>
          <div className="showall"></div>
        </section>
      </div>
    </>
  );
}

export default LearnerDashboard;
