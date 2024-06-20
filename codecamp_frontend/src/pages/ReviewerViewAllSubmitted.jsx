import { useEffect, useState } from "react";
import axios from "axios";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/ViewAll.css";

function ReviewerViewAllSubmitted() {
  const dashboard = RedirectButton("reviewer", "Dashboard");
  const [assignments, setAssignments] = useState([]);
  const [assignmentStatusEnum, setAssignmentStatusEnum] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority;
  const user = authorityArray[0];

  // Validate a user's access to a webpage
  Validate(token, cleanUserAuthority);

  // automatically fetches and loads all assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("lmsusertoken");
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        setAssignments(response.data.assignment);
        setAssignmentStatusEnum(response.data.assignmentStatusEnums);
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

  const submittedAssignments = assignments.filter(
    (item) => item.assignment.status === "Submitted"
  );

  // const submitted = assignments.assignmentStatusEnums.status === "submitted";

  console.log("Assignments", submittedAssignments); // TODO
  console.log("Status", assignmentStatusEnum); // TODO

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = assignments.assignment.id;
    const codeReviewer = assignments.assignment.codeReviewer;

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

  return (
    <>
      <div className="assignment-table">
        {dashboard}

        <hr className="separationline" />

        <table className="assignment-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Github URL</th>
              <th>Branch</th>
              <th>Learner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {submittedAssignments.map((assignmentItem) => (
              <tr key={assignmentItem.assignment.id}>
                <td>{assignmentItem.assignment.number}</td>
                <td>
                  <a href={assignmentItem.assignment.githubUrl}>Link</a>
                </td>
                <td>{assignmentItem.assignment.branch}</td>
                <td>{assignmentItem.assignment.user.username}</td>
                <td className="button-colunm">
                  <button
                    className="viewall-claim-button"
                    onClick={handleSubmit}
                  >
                    Claim
                  </button>
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
