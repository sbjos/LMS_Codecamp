import { useState, useEffect } from "react";
import axios from "axios";
import LearnerMapping from "../../components/learner/LearnerMapping";
import RedirectUrl from "../../components/RedirectUrl";
import ModalNewAssignment from "../../components/learner/modal/ModalNewAssignment";
import "../../css/LearnerDashboard.css";

function LearnerDashboard() {
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const authorityArray = userAuthority ? userAuthority.split(", ") : "";

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
      <div className="dashboard-root">
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
              {ModalNewAssignment()}
              <a
                className="btn btn-light btn-md welcome-section-text-btn-one-on-one"
                href={RedirectUrl.LearnerRequestOneOnOne}
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
            {/* submitted desktop version */}
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
                href={RedirectUrl.learnerSubmittedAssignments}
              >
                View all
              </a>
            </div>

            <ul
              className={
                submitted.length > 0
                  ? "card-list card-list-submitted"
                  : "no-card-list"
              }
            >
              {submitted.length > 0 ? (
                LearnerMapping(submitted.slice(-4))
              ) : (
                <p className="no-assignment">No assignments</p>
              )}
            </ul>

            {/* submitted mobile version */}
            <div
              className="card-container-label-mobile"
              id="submitted-label-mobile"
            >
              <a
                type="button"
                className="btn-label-status-mobile"
                href={RedirectUrl.learnerSubmittedAssignments}
              >
                View submitted assignments
              </a>
            </div>
          </div>

          <div className="card-container" id="inreview-container">
            {/* in review desktop */}
            <div className="card-container-label-desktop" id="inreview-label">
              <label className="label-status">Assignments in review</label>
              <a
                type="button"
                className="btn btn-md btn-card-container-viewall"
                href={RedirectUrl.learnerInReviewAssignments}
              >
                View all
              </a>
            </div>

            <ul
              className={
                inReview.length > 0
                  ? "card-list card-list-inreview"
                  : "no-card-list"
              }
            >
              {inReview.length > 0 ? (
                LearnerMapping(inReview.slice(-4))
              ) : (
                <p className="no-assignment">No assignments</p>
              )}
            </ul>

            {/* in review mobile */}
            <div
              className="card-container-label-mobile"
              id="submitted-label-mobile"
            >
              <a
                type="button"
                className="btn-label-status-mobile"
                href={RedirectUrl.learnerInReviewAssignments}
              >
                View assignments in review
              </a>
            </div>
          </div>

          <div className="card-container" id="needswork-container">
            {/* needs work desktop */}
            <div className="card-container-label-desktop" id="needswork-label">
              <label className="label-status">Assignments needs work</label>
              <a
                type="button"
                className="btn btn-md btn-card-container-viewall"
                href={RedirectUrl.learnerNeedsWorkAssignments}
              >
                View all
              </a>
            </div>
            <ul
              className={
                needsWwork.length > 0
                  ? "card-list card-list-needswork"
                  : "no-card-list"
              }
            >
              {needsWwork.length > 0 ? (
                LearnerMapping(needsWwork.slice(-4))
              ) : (
                <p className="no-assignment">No assignments</p>
              )}
            </ul>

            {/* needs work mobile */}
            <div
              className="card-container-label-mobile"
              id="submitted-label-mobile"
            >
              <a
                type="button"
                className="btn-label-status-mobile"
                href={RedirectUrl.learnerNeedsWorkAssignments}
              >
                View assignments that needs work
              </a>
            </div>
          </div>

          <div className="card-container" id="completed-container">
            {/* desktop */}
            <div className="card-container-label-desktop" id="completed-label">
              <label className="label-status">Assignments completed</label>
              <a
                type="button"
                className="btn btn-md btn-card-container-viewall"
                href={RedirectUrl.learnerCompletedAssignments}
              >
                View all
              </a>
            </div>
            <ul
              className={
                completed.length > 0
                  ? "card-list card-list-completed"
                  : "no-card-list"
              }
            >
              {completed.length > 0 ? (
                LearnerMapping(completed.slice(-4))
              ) : (
                <p className="no-assignment">No assignments</p>
              )}
            </ul>

            {/* mobile */}
            <div
              className="card-container-label-mobile"
              id="submitted-label-mobile"
            >
              <a
                type="button"
                className="btn-label-status-mobile"
                href={RedirectUrl.learnerCompletedAssignments}
              >
                View completed assignments
              </a>
            </div>
          </div>
          <div className="showall"></div>
        </section>
      </div>
    </>
  );
}

export default LearnerDashboard;
