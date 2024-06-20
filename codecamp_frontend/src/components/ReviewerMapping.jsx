import axios from "axios";
import RedirectButton from "./RedirectButton";
import { useState } from "react";

function ReviewerMapping(assignments, token) {
  /**
   *  Form submition for claiming an assignment.
   * @param {*} e
   */
  const handleSubmit = async (e, assignmentItem) => {
    e.preventDefault();

    const id = assignmentItem.id;
    const user = assignmentItem.user;
    const codeReviewer = assignmentItem.codeReviewer;

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

  const view = RedirectButton(
    "reviewer-assignment-view",
    "View",
    assignments.id
  );

  /**
   * Sets the button based on the assignment status.
   * @param {*} assignmentItem
   * @returns Claim, Reclaim or View button
   */
  const button = (assignmentItem) => {
    const codeReviewer = assignmentItem.codeReviewer;
    const assignmentStatus = assignmentItem.status;

    // Button config based in assignment status.
    if (assignmentStatus === "Submitted") {
      return codeReviewer ? (
        <button onClick={(e) => handleSubmit(e, assignmentItem)}>
          Reclaim
        </button>
      ) : (
        <button onClick={(e) => handleSubmit(e, assignmentItem)}>Claim</button>
      );
    } else {
      return view;
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
          <div id="card-button">{button(assignmentItem)}</div>
        </li>
      ))}
    </>
  );
}

export default ReviewerMapping;
