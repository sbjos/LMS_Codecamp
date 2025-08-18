import { useEffect, useState } from "react";
import axios from "axios";
import ModalEdit from "../../components/learner/modal/ModalEdit";
import "../../css/ViewAll.css";
import Validate from "../../components/Validate";

function LearnerViewAllSubmitted() {
  Validate();

  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");

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
        <section className="viewall-section-1 viewall-section-1-submitted">
          <dir className="title-container">
            <h1 className="title">Submitted assignments</h1>
            <hr className="title-line" />
          </dir>
        </section>
        <section className="viewall-section-2">
          <div className="empty-section"></div>
        </section>
        <section className="viewall-section-3">
          <table className="assignment-table">
            <thead className="assignment-table-list assignment-table-list-submitted">
              <tr>
                <th className="viewall-th viewall-name-desktop">
                  Assignment name
                </th>
                <th className="viewall-th viewall-name-mobile">Name</th>
                <th className="viewall-th viewall-description">Description</th>
                <th className="viewall-th viewall-reviewer">Reviewer</th>
                <th className="viewall-th viewall-feedback">Feedback</th>
                <th className="viewall-th viewall-assignment-desktop">
                  Assignment URL
                </th>
                <th className="viewall-th viewall-assignment-mobile">URL</th>
                <th className="viewall-th viewall-branch">Branch</th>
                <th> </th>
              </tr>
            </thead>

            <tbody className="assignment-table-list-body assignment-table-list-submitted--body">
              {submittedAssignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="viewall-td viewall-name">{assignment.name}</td>
                  <td className="viewall-td viewall-description">
                    {assignment.description}
                  </td>
                  <td className="viewall-td viewall-reviewer">Unassigned</td>
                  <td className="viewall-td viewall-feedback">No feedback</td>
                  <td className="viewall-td viewall-assignment">
                    <a
                      className="assignment-link"
                      href={assignment.assignmentUrl}
                      target="blank"
                    >
                      <u className="assignment-link-desktop">Assignment link</u>
                      <u className="assignment-link-mobile">Link</u>
                    </a>
                  </td>
                  <td className="viewall-td viewall-branch">
                    {assignment.branch}
                  </td>
                  <td className="viewall-td viewall-button">
                    {ModalEdit(assignment, "btn-card-link", "Edit")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="viewall-section-4"></section>
      </div>
    </>
  );
}

export default LearnerViewAllSubmitted;
