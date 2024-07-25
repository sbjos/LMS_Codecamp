import RedirectUrl from "./RedirectUrl";
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
        <a
          className="card-link"
          style={{ textDecoration: "underline" }}
          href={RedirectUrl.learnerAssignmentView + id}
        >
          Edit
        </a>
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
            <h5 className="card-title card-title-custom">
              {assignment.number}
            </h5>
            <p className="card-text card-text-custom ">
              A quick summary on the assignment.{assignment.desctiption}
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
