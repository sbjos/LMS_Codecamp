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
        <a class="button" href={learnerRootUrl + "/assignment/" + id}>
          Edit
        </a>
      );
    } else {
      return (
        <a class="button" href={learnerRootUrl + "/assignment/" + id}>
          View
        </a>
      );
    }
  }

  return (
    <>
      {assignments.map((assignment) => (
        <li className="cards" key={assignment.id}>
          <div>Assignment {assignment.number}</div>
          <div>
            <a href={assignment.githubUrl} target="blank">
              <u>Github</u>
            </a>
          </div>
          <div>Branch: {assignment.branch}</div>
          <div>
            {assignment.codeReviewer
              ? assignment.codeReviewer.firstname +
                " " +
                assignment.codeReviewer.lastname
              : "unassigned"}
          </div>
          <div id="card-button">{renderButton(assignment)}</div>
        </li>
      ))}
      <div></div>
    </>
  );
}

export default LearnerMapping;
