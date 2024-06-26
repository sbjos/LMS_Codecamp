import { useEffect, useState } from "react";
import axios from "axios";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/ViewAll.css";

function ReviewerViewAllCompleted() {
  const dashboard = (
    <RedirectButton reference="reviewer" buttonName="Dashboard" />
  );
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority;

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
        setCompletedAssignments(
          response.data.filter(
            (item) =>
              item.assignment.status === "Completed" &&
              String(item.assignment.codeReviewer.id) === authorityArray[0]
          )
        );
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else {
          console.error(err);
          alert("Failed to retirve assignments!");
        }
      }
    };
    fetchData();
  }, []);

  console.log("completedAssignments", completedAssignments); // CONSOLE

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = completedAssignments.id;

    try {
      const assignment = {
        codeReviewer: completedAssignments.assignment.codeReviewer,
        status: "In review",
        user: completedAssignments.assignment.codeReviewer,
      };
      const response = await axios.put(
        "http://localhost:8080/api/assignments/" + id,
        assignment,
        { headers: { Authorization: "Bearer " + token } }
      );
      alert("Assignment reopened successfully!");
      window.location.reload();
    } catch (err) {
      if (!err) {
        console.error("No server response");
      } else {
        console.error(err);
        alert("Failed to open the assignment!");
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
              <th>Reviewer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {completedAssignments.map((assignment) => (
              <tr key={assignment.assignment.id}>
                <td>{assignment.assignment.number}</td>
                <td>
                  <a href={assignment.assignment.githubUrl}>Link</a>
                </td>
                <td>{assignment.assignment.branch}</td>
                <td>{assignment.assignment.user.username}</td>
                <td>{assignment.assignment.codeReviewer.username}</td>
                <td className="button-colunm">
                  {
                    <RedirectButton
                      reference="reviewer-assignment-view"
                      buttonName="View"
                      data={assignment.assignment.id}
                      classname="viewall-claim-button"
                    />
                  }
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
