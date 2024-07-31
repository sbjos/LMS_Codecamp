import RedirectUrl from "./RedirectUrl";
import LearnerAssignmentEdit from "./LearnerAssignmentEdit";
import LearnerAssignmentView from "./LearnerAssignmentView";
import "../css/Dashboard.css";
import "../css/ModalStyle.css";

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
            type="button"
            data-bs-toggle="modal"
            data-bs-target={`#edit-assignment-modal-${id}`}
          >
            Edit
          </a>
          <div
            className="modal fade"
            id={`edit-assignment-modal-${id}`}
            tabIndex="-1"
            aria-labelledby={`edit-assignment-modal-label-"${id}`}
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-custom">
              <div className="modal-content modal-content-custom">
                <div className="modal-header modal-header-custom">
                  <h1
                    className="modal-title fs-4 modal-title-custom"
                    id={`edit-assignment-modal-label-${id}`}
                  >
                    {assignment.name}
                  </h1>
                  <h3
                    className="form-label text-body-secondary modal-label-description"
                    htmlFor="exampleFormControlInput1"
                  >
                    {assignment.description}
                  </h3>
                  <h3
                    className="form-label text-body-secondary modal-label-status"
                    htmlFor="exampleFormControlInput1"
                  >
                    {assignment.status}
                  </h3>
                </div>
                <div className="modal-body">
                  <LearnerAssignmentEdit assignments={assignment} />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <a
            className="card-link"
            style={{ textDecoration: "underline" }}
            type="button"
            data-bs-toggle="modal"
            data-bs-target={`#view-assignment-modal-${id}`}
          >
            View
          </a>
          <div
            className="modal fade"
            id={`view-assignment-modal-${id}`}
            tabIndex="-1"
            aria-labelledby={`view-assignment-modal-label-"${id}`}
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-custom">
              <div className="modal-content modal-content-custom">
                <div className="modal-header modal-header-custom">
                  <h1
                    className="modal-title fs-4 modal-title-custom"
                    id={`view-assignment-modal-label-${id}`}
                  >
                    {assignment.name}
                  </h1>
                  <h3
                    className="form-label text-body-secondary modal-label-description"
                    htmlFor="exampleFormControlInput1"
                  >
                    {assignment.description}
                  </h3>
                  <h3
                    className="form-label text-body-secondary modal-label-status"
                    htmlFor="exampleFormControlInput1"
                  >
                    {assignment.status}
                  </h3>
                </div>
                <div className="modal-body">
                  <LearnerAssignmentView assignments={assignment} />
                </div>
              </div>
            </div>
          </div>
        </>
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
