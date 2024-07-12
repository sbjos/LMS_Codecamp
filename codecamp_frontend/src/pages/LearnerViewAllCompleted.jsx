import { useEffect, useState } from "react";
import axios from "axios";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/ViewAll.css";

function LearnerViewAllCompleted() {
  const dashboardButton = (
    <RedirectButton reference="learner-dashboard" buttonName="Dashboard" />
  );
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
          alert("Failed to retrieve assignments!");
        }
      }
    };
    fetchData();
  }, []);

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
            {completedAssignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.number}</td>
                <td>
                  <a href={assignment.githubUrl}>Link</a>
                </td>
                <td>{assignment.branch}</td>
                <td>{assignment.codeReviewer.username}</td>
                <td className="button-colunm">
                  {
                    <RedirectButton
                      reference="learner-assignment-view"
                      buttonName="View"
                      data={assignment.id}
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

export default LearnerViewAllCompleted;
