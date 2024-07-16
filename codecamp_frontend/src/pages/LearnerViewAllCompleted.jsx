import { useEffect, useState } from "react";
import axios from "axios";
import Validate from "../components/Validate";
import RedirectUrl from "../components/RedirectUrl";
import "../css/ViewAll.css";

function LearnerViewAllCompleted() {
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");

  // Validate a user's access to a webpage
  Validate(token, userAuthority);

  // automatically fetches and loads all assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        setCompletedAssignments(
          response.data.filter((item) => item.status === "Completed")
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

  return (
    <>
      <div className="assignment-table">
        {/* {dashboardButton} */}

        <hr className="separationline" />

        <table className="assignment-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Github URL</th>
              <th>Branch</th>
              <th>Reviewer</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {completedAssignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.number}</td>
                <td>
                  <a href={assignment.githubUrl} target="blank">
                    <u>Github</u>
                  </a>
                </td>
                <td>{assignment.branch}</td>
                <td>
                  {assignment.codeReviewer.firstname +
                    " " +
                    assignment.codeReviewer.lastname}
                </td>
                <td className="button-colunm">
                  <a
                    className="nav-link active"
                    href={RedirectUrl.learnerAssignmentView + assignment.id}
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LearnerViewAllCompleted;
