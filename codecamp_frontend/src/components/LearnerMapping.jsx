function LearnerMapping(assignments) {
  /**
   * Sets the button based on the assignment status.
   * @param {*} assignmentItem
   * @returns the appropriate button for the card.
   */
  function renderButton(assignmentItem) {
    const assignmentStatus = assignmentItem.status;
    const id = assignmentItem.id;
    const userAuthority = localStorage.getItem("lmsuserauthorities");
    const authorityArray = userAuthority.split(", ");
    const urlPathVariable = authorityArray[1] + authorityArray[2];
    const learnerRootUrl = "/codecamp/dashboard/" + urlPathVariable;

    // filters by assignment status to assign the appropriate button on the assignment card
    if (assignmentStatus !== "Completed" && assignmentStatus !== "In review") {
      return (
        <a class="card-link" href={learnerRootUrl + "/assignment/" + id}>
          Edit
        </a>
      );
    } else {
      return (
        <a class="card-link" href={learnerRootUrl + "/assignment/" + id}>
          View
        </a>
      );
    }
  }

  return (
    <>
      {assignments.map((assignment) => (
        <div class="card card-custom" key={assignment.id}>
          <div class="card-body">
            <h5 class="card-title">{assignment.number}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <a href={assignment.githubUrl} target="blank">
                <u>Github</u>
              </a>
            </li>
            <li class="list-group-item">Branch: {assignment.branch}</li>
            <li class="list-group-item">
              {assignment.codeReviewer
                ? assignment.codeReviewer.firstname +
                  " " +
                  assignment.codeReviewer.lastname
                : "unassigned"}
            </li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">
              {renderButton(assignment)}
            </a>
          </div>
        </div>
      ))}
      <div></div>
    </>
  );
}

export default LearnerMapping;
