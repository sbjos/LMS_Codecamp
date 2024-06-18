import RedirectButton from "./RedirectButton";

function LearnerMapping(assignments) {
  const assignmentId = assignments.filter((item) => item.assignment.status);
  console.log("assignmentId");
  // const view = RedirectButton("learner-view", "View", assignmentId);

  // If assignment status is completed, a view button is added to access video review.
  function button(assignmentItem) {
    const assignmentStatus = assignmentItem.assignment.status;
    const video = assignmentItem.assignment.reviewVideoUrl;
    const id = assignmentItem.assignment.id;

    // filters by assignment status to assign the appropriate button on the assignment card
    if (assignmentStatus !== "Completed" && assignmentStatus !== "In review") {
      return (
        <a className="button" href={"/api/assignment/" + id}>
          Edit
        </a>
      );
    } else {
      return (
        <a className="button" href={"/api/learner/assignment/" + id}>
          View
        </a>
      );
    }
  }

  return (
    <>
      {assignments.map((assignmentItem) => (
        <li className="cards" key={assignmentItem.assignment.id}>
          <div>Assignment {assignmentItem.assignment.number}</div>
          <div>
            <a href={assignmentItem.assignment.githubUrl}>Github Link</a>
          </div>
          <div>Branch: {assignmentItem.assignment.branch}</div>
          <div>
            {assignmentItem.assignment.codeReviewer
              ? assignmentItem.assignment.codeReviewer.username
              : "Unassigned"}
          </div>
          <div id="card-button">{button(assignmentItem)}</div>
        </li>
      ))}
    </>
  );
}

export default LearnerMapping;
