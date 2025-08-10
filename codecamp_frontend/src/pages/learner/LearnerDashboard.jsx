import { useState, useEffect } from "react";
import axios from "axios";
import LearnerMapping from "../../components/learner/LearnerMapping";
import RedirectUrl from "../../components/RedirectUrl";
import ModalNewAssignment from "../../components/learner/modal/ModalNewAssignment";
import Validate from "../../components/Validate";
import "../../css/LearnerDashboard.css";

function LearnerDashboard() {
  // call to validate user token
  Validate();

  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const authorityArray = userAuthority ? userAuthority.split(", ") : "";

  // automatically fetches and loads user's assignments
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

  // const submitted = 0;
  // const inReview = 0;
  // const needsWwork = 0;
  // const completed = 0;

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
            <hr className="separation-line" id="line-section-1" />
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
          {/* <div className="empty-section"></div> */}
          <div className="assignment-count-container">
            <ul className="assignment-count-list">
              <li className="assignment-count-totalassignments">
                <label
                  className="assignment-count-label"
                  htmlFor="Total assignemnts"
                >
                  Total assignemnts
                </label>
                <div className="assignment-count-group">
                  <div className="assignment-count">
                    {assignments.length > 1 ? assignments.length : "-"}
                  </div>
                </div>
              </li>
              <li className="assignment-count-submitted">
                <label className="assignment-count-label" htmlFor="Submitted">
                  Submitted assignment
                </label>
                <div className="assignment-count-group">
                  <div className="assignment-count">
                    {submitted.length > 1 ? submitted.length : "-"}
                  </div>
                  <div className="assignment-count-percentage">
                    {submitted.length > 1
                      ? `${Math.round((submitted.length / assignments.length) * 100)}%`
                      : "-"}
                  </div>
                </div>
              </li>
              <li className="assignment-count-inreview">
                <label className="assignment-count-label" htmlFor="In review">
                  In review assignment
                </label>
                <div className="assignment-count-group">
                  <div className="assignment-count">
                    {inReview.length > 1 ? inReview.length : "-"}
                  </div>
                  <div className="assignment-count-percentage">
                    {inReview.length > 1
                      ? `${Math.round((inReview.length / assignments.length) * 100)}%`
                      : "-"}
                  </div>
                </div>
              </li>
              <li className="assignment-count-needswork">
                <label className="assignment-count-label" htmlFor="Needs work">
                  Needs work assignment
                </label>
                <div className="assignment-count-group">
                  <div className="assignment-count">
                    {needsWwork.length > 1 ? needsWwork.length : "-"}
                  </div>
                  <div className="assignment-count-percentage">
                    {needsWwork.length > 1
                      ? `${Math.round((needsWwork.length / assignments.length) * 100)}%`
                      : "-"}
                  </div>
                </div>
              </li>
              <li className="assignment-count-completed">
                <label className="assignment-count-label" htmlFor="Completed">
                  Completed assignment
                </label>
                <div className="assignment-count-group">
                  <div className="assignment-count">
                    {completed.length > 1 ? completed.length : "-"}
                  </div>
                  <div className="assignment-count-percentage">
                    {completed.length > 1
                      ? `${Math.round((completed.length / assignments.length) * 100)}%`
                      : "-"}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* section-3 */}
        <section className="dashboard-section-3">
          <div className="card-container" id="submitted-container">
            {/* submitted desktop version */}
            <div className="card-container-label-desktop" id="submitted-label">
              <a
                type="button"
                className="btn btn-md btn-card-container-viewall"
                htmlFor="View Assignments submitted"
                href={RedirectUrl.learnerSubmittedAssignments}
              >
                Submitted
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
                Submitted
              </a>
            </div>
          </div>

          <div className="card-container" id="inreview-container">
            {/* in review desktop */}
            <div className="card-container-label-desktop" id="inreview-label">
              <a
                href={RedirectUrl.learnerInReviewAssignments}
                type="button"
                className="btn btn-md btn-card-container-viewall"
              >
                In review
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
                In review
              </a>
            </div>
          </div>

          <div className="card-container" id="needswork-container">
            {/* needs work desktop */}
            <div className="card-container-label-desktop" id="needswork-label">
              <a
                className="btn btn-md btn-card-container-viewall"
                type="button"
                href={RedirectUrl.learnerNeedsWorkAssignments}
              >
                Need work
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
                Need work
              </a>
            </div>
          </div>
          <div className="card-container" id="completed-container">
            {/* desktop */}
            <div className="card-container-label-desktop" id="completed-label">
              <a
                className="btn btn-md btn-card-container-viewall"
                type="button"
                href={RedirectUrl.learnerCompletedAssignments}
              >
                Completed
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
                Completed
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
