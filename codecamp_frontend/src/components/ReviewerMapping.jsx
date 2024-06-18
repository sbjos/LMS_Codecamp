import axios from "axios";

function ReviewerMapping(assignments, token) {
  // Sets the button based on the assignment status. Also submits a form to claim an assignment.
  function button(assignmentItem) {
    const id = assignmentItem.assignment.id;
    const assignmentStatus = assignmentItem.assignment.status;
    const user = assignmentItem.assignment.user;
    const codeReviewer = assignmentItem.assignment.codeReviewer;
    const reviewVideoUrl = assignmentItem.assignment.reviewVideoUrl;

    // Form submition for claiming an assignment.
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const status = "In review";
        const assignment = { codeReviewer, status, user };
        const response = await axios.put(
          "http://localhost:8080/api/assignments/" + id,
          assignment,
          { headers: { Authorization: "Bearer " + token } }
        );
        alert("Assignment claimed successfully !");
        window.location.reload();
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else {
          console.error(err);
          alert("Failed to claim the assignment !");
        }
      }
    };

    if (assignmentStatus === "Submitted" > 4) {
      alert("Not Possible");
    }

    // Assignments by status
    const submitted = assignments.filter(
      (item) => item.assignment.status === "Submitted"
    );
    const inReview = assignments.filter(
      (item) => item.assignment.status === "In review"
    );
    const needsWork = assignments.filter(
      (item) => item.assignment.status === "Needs work"
    );
    const completed = assignments.filter(
      (item) => item.assignment.status === "Completed"
    );

    // Button config based on assignment status.
    if (assignmentStatus === "Submitted" && codeReviewer !== null) {
      return (
        <form className="form-claim" onSubmit={handleSubmit}>
          <button>Reclaim</button>
        </form>
      );
    } else if (assignmentStatus === "Submitted") {
      return (
        <form className="form-claim" onSubmit={handleSubmit}>
          <button>Claim</button>
        </form>
      );
    } else {
      return (
        <a className="button" href={"/api/reviewer/assignment/" + id}>
          View
        </a>
      );
    }
  }

  return (
    <>
      {assignments.map((assignmentItem) => (
        <li className="cards" key={assignmentItem.assignment.id}>
          <div>Number: {assignmentItem.assignment.number}</div>
          <div>
            Github:&nbsp;
            <a href={assignmentItem.assignment.githubUrl}>Link</a>
          </div>
          <div>Branch: {assignmentItem.assignment.branch}</div>
          <div>Learner: {assignmentItem.assignment.user.username}</div>
          <div id="card-button">{button(assignmentItem)}</div>
        </li>
      ))}
    </>
  );
}

export default ReviewerMapping;
