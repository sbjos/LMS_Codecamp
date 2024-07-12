import RedirectButton from "../components/RedirectButton";

function LearnerMapping(assignments) {
  /**
   * Sets the button based on the assignment status.
   * @param {*} assignmentItem
   * @returns the appropriate button for the card.
   */
  function renderButton(assignmentItem) {
    const assignmentStatus = assignmentItem.status;
    const id = assignmentItem.id;

    // filters by assignment status to assign the appropriate button on the assignment card
    if (assignmentStatus !== "Completed" && assignmentStatus !== "In review") {
      return (
        <RedirectButton
          reference="learner-assignment-view"
          buttonName="Edit"
          data={id}
        />
      );
    } else {
      return (
        <RedirectButton
          reference="learner-assignment-view"
          buttonName="view"
          data={id}
        />
      );
    }
  }

  return (
    <>
      {assignments.map((assignment) => (
        <li className="cards" key={assignment.id}>
          <div>Assignment {assignment.number}</div>
          <div>
            <a href={assignment.githubUrl}>Github Link</a>
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
