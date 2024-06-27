import RedirectButton from "../components/RedirectButton";

function LearnerMapping(assignments) {
  /**
   * Sets the button based on the assignment status.
   * @param {*} assignmentItem
   * @returns the appropriate button for the card.
   */
  function renderButton(assignmentItem) {
    const assignmentStatus = assignmentItem.status;
    const video = assignmentItem.reviewVideoUrl;
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
      {assignments.map((assignmentItem) => (
        <li className="cards" key={assignmentItem.id}>
          <div>Assignment {assignmentItem.number}</div>
          <div>
            <a href={assignmentItem.githubUrl}>Github Link</a>
          </div>
          <div>Branch: {assignmentItem.branch}</div>
          <div>
            {assignmentItem.codeReviewer
              ? assignmentItem.codeReviewer.username
              : "Unassigned"}
          </div>
          <div id="card-button">{renderButton(assignmentItem)}</div>
        </li>
      ))}
    </>
  );
}

export default LearnerMapping;
