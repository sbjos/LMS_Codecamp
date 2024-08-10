import { useEffect, useState } from "react";
import axios from "axios";
import Validate from "../components/Validate";
import RedirectUrl from "../components/RedirectUrl";
import "../css/ViewAll.css";

function ReviewerViewAllSubmitted() {
  const dashboardButton = (
    <RedirectUrl reference="reviewer-dashboard" buttonName="Dashboard" />
  );
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority.split(", ");

  // Validate a user's access to a webpage
  Validate(token, cleanUserAuthority);

  // automatically fetches and loads all assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        setSubmittedAssignments(
          response.data.filter((item) => item.status === "Submitted")
        );
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else {
          console.error(err);
        }
      }
    };
    fetchData();
  }, []);

  console.log("submittedAssignments", submittedAssignments);

  // const submittedAssignments = assignments.filter(
  //   (item) => item.status === "Submitted"
  // );

  const handleSubmit = async (e, assignmentItem) => {
    e.preventDefault();

    const id = assignmentItem.id;

    try {
      const assignment = {
        codeReviewer: assignmentItem.codeReviewer,
        status: "In review",
        user: assignmentItem.user,
      };
      const response = await axios.put(
        "http://localhost:8080/api/assignments/" + id,
        assignment,
        { headers: { Authorization: "Bearer " + token } }
      );

      alert("Assignment claimed successfully!");
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

    // Button conf ig based in assignment status.
    const codeReviewerIdString = String(assignmentItem.codeReviewer?.id);
    const codeReviewerIdMatch = codeReviewerIdString === authorityArray[0];

    if (assignmentItem.status === "Submitted") {
      return codeReviewerIdMatch ? (
        <button
          className="viewall-claim-button"
          onClick={(e) => handleSubmit(e, assignmentItem)}
        >
          Reclaim
        </button>
      ) : (
        <button
          className="viewall-claim-button"
          onClick={(e) => handleSubmit(e, assignmentItem)}
        >
          Claim
        </button>
      );
    }
  };

  return (
    <>
      <div className="assignment-table">
        {dashboardButton}

        <hr className="separationline" />

        <table className="assignment-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Github URL</th>
              <th>Branch</th>
              <th>Learner</th>
              <th>Reviewer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {submittedAssignments.map((assignmentItem) => (
              <tr key={assignmentItem.id}>
                <td>{assignmentItem.number}</td>
                <td>
                  <a href={assignmentItem.githubUrl}>Link</a>
                </td>
                <td>{assignmentItem.branch}</td>
                <td>
                  {assignmentItem.user.firstname +
                    " " +
                    assignmentItem.user.lastname}
                </td>
                <td>
                  {assignmentItem.codeReviewer
                    ? assignmentItem.codeReviewer.firstname +
                      " " +
                      assignmentItem.codeReviewer.lastname
                    : ""}
                </td>
                <td className="button-colunm">
                  {renderButton(assignmentItem)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ReviewerViewAllSubmitted;
