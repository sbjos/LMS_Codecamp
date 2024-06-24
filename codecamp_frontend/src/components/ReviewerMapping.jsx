import axios from "axios";
import RedirectButton from "./RedirectButton";

function ReviewerMapping(assignments, token, data) {
  /**
   * Form submition for claiming an assignment.
   * @param {*} e
   * @param {*} assignmentItem
   */
  const handleClick = async (e, assignmentItem) => {
    e.preventDefault();

    try {
      const assignment = {
        codeReviewer: assignmentItem.codeReviewer,
        status: "In review",
        user: assignmentItem.user,
      };
      const response = await axios.put(
        "http://localhost:8080/api/assignments/" + assignmentItem.id,
        assignment,
        { headers: { Authorization: "Bearer " + token } }
      );

      alert("Assignment claimed successfully !");
      window.location.reload();
    } catch (err) {
      if (!err) {
        console.error("No server response");
      }
      if (err.response.status === 403) {
        alert("To many assignments in 'in review' status");
      } else {
        console.error(err);
        alert("Failed to claim the assignment!");
      }
    }
  };

  /**
   * Sets the button based on the assignment status.
   * @param {*} assignmentItem
   * @returns the apropriate button for the card.
   */
  const renderButton = (assignmentItem) => {
    // console.log(
    //   "vrify",
    //   assignments.map((item) => item.status === "In review").length >= 4
    // ); // CONSOLE

    // FIXME: stops a reviewer from claiming more than 4 assignments
    // if (assignments.map((item) => item.status === "In review").length >= 4) {
    //   alert("You have to many assignments in 'in review' status");
    //   return null;
    // }

    // Button config based in assignment status.
    const codeReviewerIdMatch = assignments.some(
      (item) => String(item.codeReviewer?.id) === String(data)
    );

    if (assignmentItem.status === "Submitted") {
      return codeReviewerIdMatch ? (
        <button onClick={(e) => handleClick(e, assignmentItem)}>Reclaim</button>
      ) : (
        <button onClick={(e) => handleClick(e, assignmentItem)}>Claim</button>
      );
    } else {
      return (
        <RedirectButton
          reference="reviewer-assignment-view"
          buttonName="View"
          data={assignmentItem.id}
        />
      );
    }
  };

  return (
    <>
      {assignments.map((assignmentItem) => (
        <li className="cards" key={assignmentItem.id}>
          <div>Number: {assignmentItem.number}</div>
          <div>
            Github:&nbsp;
            <a href={assignmentItem.githubUrl}>Link</a>
          </div>
          <div>Branch: {assignmentItem.branch}</div>
          <div>Learner: {assignmentItem.user.username}</div>
          <div>
            Reviewer:{" "}
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

export default ReviewerMapping;
