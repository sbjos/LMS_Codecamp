import RedirectUrl from "./RedirectUrl";
import LearnerAssignmentEditTest from "./LearnerAssignmentEditTest";
import "../css/Dashboard.css";

function LearnerMapping(assignments) {
  /**
   * Sets the button based on the assignment status.
   * @param {*} assignment
   * @returns the appropriate button for the card.
   */

  function renderButton(assignment) {
    const assignmentStatus = assignment.status;
    const id = assignment.id;

    // filters by assignment status to assign the appropriate button on the assignment card
    if (assignmentStatus !== "Completed" && assignmentStatus !== "In review") {
      return (
        <>
          {/* modal */}
          <a
            className="card-link"
            style={{ textDecoration: "underline" }}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#edit-assignment-modal"
          >
            Edit
          </a>
          <div
            className="modal fade"
            id="edit-assignment-modal"
            tabIndex="-1"
            aria-labelledby="edit-assignment-modal-label"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-custom">
              <div className="modal-content modal-content-custom">
                <div className="modal-header">
                  <h1
                    className="modal-title text-body-secondary fw-medium fs-4 modal-title-custom"
                    id="edit-assignment-modal-label"
                  >
                    Edit this assignment
                  </h1>
                </div>
                <div className="modal-body">
                  <LearnerAssignmentEditTest assignments={assignments} />
                </div>
              </div>
            </div>
          </div>
          {/* modal */}
        </>
      );
    } else {
      return (
        <a
          className="card-link"
          style={{ textDecoration: "underline" }}
          href={RedirectUrl.learnerAssignmentView + id}
        >
          View
        </a>
      );
    }
  }

  return (
    <>
      {assignments.map((assignment) => (
        <li className="card card-custom" key={assignment.id}>
          <div className="card-body card-body-custom">
            <h5 className="card-title card-title-custom">{assignment.name}</h5>

            <hr className="separation-line" />

            <p className="card-text card-text-custom ">
              {assignment.description}
            </p>
          </div>
          <ul className="list-group list-group-flush card-list-group-custom">
            <li className="list-group-item list-group-item-custom">
              <a
                className="card-link"
                href={assignment.githubUrl}
                target="blank"
              >
                Github link
              </a>
            </li>
            <li className="list-group-item list-group-item-custom-branch">
              {assignment.branch}
            </li>
            <li className="list-group-item list-group-item-custom">
              {assignment.codeReviewer
                ? assignment.codeReviewer.firstname +
                  " " +
                  assignment.codeReviewer.lastname
                : "Not assigned"}
            </li>
          </ul>
          <div className="card-body card-body-link-custom">
            {renderButton(assignment)}
          </div>
        </li>
      ))}
    </>
  );
}

export default LearnerMapping;
