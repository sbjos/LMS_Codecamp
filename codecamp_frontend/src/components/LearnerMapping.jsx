import RedirectUrl from "./RedirectUrl";

function LearnerMapping(assignments, btnClass) {
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
        <div class="card" style={{ width: "18rem" }} key={assignment.id}>
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{assignment.number}</h5>
            <p class="card-text">Aquick summary on the assignment.</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <a href={assignment.githubUrl} target="blank"></a>
            </li>
            <li class="list-group-item">{assignment.branch}</li>
            <li class="list-group-item">
              {assignment.codeReviewer
                ? assignment.codeReviewer.firstname +
                  " " +
                  assignment.codeReviewer.lastname
                : "Not assigned"}
            </li>
          </ul>
          <div className="card-body">{renderButton(assignment)}</div>
          <div class="card-body">
            <a href="#" class="card-link">
              Card link
            </a>
            <a href="#" class="card-link">
              Another link
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

export default LearnerMapping;
