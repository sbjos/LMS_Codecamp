import { useEffect, useState } from "react";
import axios from "axios";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/ViewAll.css";

function ReviewerViewAllCompleted() {
  const dashboard = RedirectButton("reviewer", "Dashboard");
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority
    ? cleanUserAuthority.split(", ")
    : "";
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
        setAssignments(response.data);
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
    (item) => item.assignment.status === "Completed"
  );

  console.log(submittedAssignments); // CONSOLE

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
            {submittedAssignments.map((assignment) => (
              <tr key={assignment.assignment.id}>
                <td>{assignment.assignment.number}</td>
                <td>
                  <a href={assignment.assignment.githubUrl}>Link</a>
                </td>
                <td>{assignment.assignment.branch}</td>
                <td>{assignment.assignment.user.username}</td>
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

export default ReviewerViewAllCompleted;
