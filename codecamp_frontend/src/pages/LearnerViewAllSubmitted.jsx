import { useEffect, useState } from "react";
import axios from "axios";
import Validate from "../components/Validate";
import ModalEdit from "../components/ModalEdit";
import "../css/ViewAll.css";

function LearnerViewAllSubmitted() {
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
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

  return (
    <>
      <div className="viewall-root">
        <section className="viewall-section-1"></section>

        <section className="viewall-section-2">
          <h1 className="title">Submitted assignments</h1>
          <table className="assignment-table">
            <thead className="assignment-table-submitted">
              <tr>
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
              {submittedAssignments.map((assignment) => (
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
                  <td className="viewall-reviewer">Unassigned</td>
                  <td className="viewall-feedback">No feedback</td>
                  <td className="viewall-github">
                    <a href={assignment.githubUrl} target="blank">
                      <u>Open your github</u>
                    </a>
                  </td>
                  <td className="viewall-branch">{assignment.branch}</td>
                  <td className="viewall-button">
                    {ModalEdit(assignment, "btn-card-link", "Update")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="viewall-section-3"></section>
      </div>
    </>
  );
}

export default LearnerViewAllSubmitted;
