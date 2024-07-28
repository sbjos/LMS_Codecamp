import { useState, useEffect } from "react";
import axios from "axios";
import LearnerMapping from "../components/LearnerMapping";
import Validate from "../components/Validate";
import "../css/Dashboard.css";
import LearnerSubmitAssignment from "../components/LearnerSubmitAssignment";

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
              {/* modal */}
              <button
                type="button"
                className="btn btn-warning btn-md welcome-section-text-btn-new-assignment"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                New assignment
              </button>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered modal-dialog-custom">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1
                        class="modal-title text-body-secondary fw-medium fs-4 modal-title-custom"
                        id="exampleModalLabel"
                      >
                        Create a new assignment
                      </h1>
                    </div>
                    <div className="modal-body px-5">
                      {<LearnerSubmitAssignment />}
                    </div>
                  </div>
                </div>
              </div>
              {/* modal */}

              <a
                className="btn btn-light btn-md welcome-section-text-btn-one-on-one"
                href="#"
                role="button"
              >
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
