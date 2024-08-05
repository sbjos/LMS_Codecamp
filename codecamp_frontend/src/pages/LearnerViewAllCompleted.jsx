import { useEffect, useState } from "react";
import axios from "axios";
import Validate from "../components/Validate";
import ModalView from "../components/ModalView";
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
      <div className="viewall-root">
        <section className="viewall-section-1"></section>

        <section className="viewall-section-2">
          <h1 className="title">Completed assignments</h1>
          <table className="assignment-table">
            <thead>
              <tr className="assignment-table-completed">
                <th className="viewall-name">App name</th>
                <th className="viewall-description">Description</th>
                <th className="viewall-reviewer">Reviewer</th>
                <th className="viewall-feedback">Feedback</th>
                <th className="viewall-github">Github URL</th>
                <th className="viewall-branch">Branch</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {completedAssignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="viewall-name-desktop">{assignment.name}</td>

                  {/* mobile */}
                  <td className="viewall-name-mobile">
                    {
                      <a href={assignment.githubUrl} target="blank">
                        {assignment.name}
                      </a>
                    }
                  </td>

                  <td className="viewall-description">
                    {assignment.description}
                  </td>
                  <td className="viewall-reviewer">
                    {assignment.codeReviewer.firstname +
                      " " +
                      assignment.codeReviewer.lastname}
                  </td>
                  <td className="viewall-feedback">
                    {assignment.reviewVideoUrl ? (
                      <a href={assignment.reviewVideoUrl}>
                        Watch the feedback!
                      </a>
                    ) : (
                      "No feedback"
                    )}
                  </td>
                  <td className="viewall-github">
                    <a href={assignment.githubUrl} target="blank">
                      <u>Open your github</u>
                    </a>
                  </td>
                  <td className="viewall-branch">{assignment.branch}</td>
                  <td className="viewall-button">
                    {ModalView(assignment, "btn-card-link", "Open")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default LearnerViewAllCompleted;
