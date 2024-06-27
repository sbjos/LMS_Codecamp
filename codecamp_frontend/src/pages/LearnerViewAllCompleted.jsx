import { useEffect, useState } from "react";
import axios from "axios";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/ViewAll.css";

function LearnerViewAllCompleted() {
  const dashboard = (
    <RedirectButton reference="learner-dashboard" buttonName="Dashboard" />
  );
  const [completedAssignments, setCompletedAssignments] = useState([]);
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
        setCompletedAssignments(
          response.data.filter(
            (item) =>
              item.assignment.status === "Completed" &&
              String(item.assignment.user.id) === authorityArray[0]
          )
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
                <td>{assignment.assignment.codeReviewer.username}</td>
                <td className="button-colunm">
                  {
                    <RedirectButton
                      reference="learner-assignment-view"
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

export default LearnerViewAllCompleted;
