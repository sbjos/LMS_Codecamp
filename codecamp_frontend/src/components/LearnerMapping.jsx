import RedirectUrl from "./RedirectUrl";

function LearnerMapping(assignments, cardClass, btnClass) {
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
          type="button"
          class={btnClass}
          href={RedirectUrl.learnerAssignmentView + id}
        >
          Edit
        </a>
      );
    } else {
      return (
        <a
          type="button"
          class={btnClass}
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
        <div className={cardClass} key={assignment.id}>
          <div className="card-body card-body-header-custom">
            <h5 className="card-title">{assignment.number}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-transparent list-group-item-custom">
              <a href={assignment.githubUrl} target="blank">
                <u>Github</u>
              </a>
            </li>
            <li className="list-group-item bg-transparent list-group-item-custom">
              {assignment.branch}
            </li>
            <li className="list-group-item bg-transparent list-group-item-custom">
              {assignment.codeReviewer
                ? assignment.codeReviewer.firstname +
                  " " +
                  assignment.codeReviewer.lastname
                : "Not assigned"}
            </li>
          </ul>
          <div className="card-body">{renderButton(assignment)}</div>
        </div>
      ))}
      <div></div>
    </>
  );
}

export default LearnerMapping;
