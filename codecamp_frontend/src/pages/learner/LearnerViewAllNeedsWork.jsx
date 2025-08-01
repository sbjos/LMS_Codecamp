import { useEffect, useState } from "react";
import axios from "axios";
import ModalEdit from "../../components/learner/modal/ModalEdit";
import "../../css/ViewAll.css";

function LearnerViewAllNeedsWork() {
  const [assignmentsNeedsWork, setAssignmentsNeedsWork] = useState([]);
  const token = localStorage.getItem("lmsusertoken");

  // automatically fetches and loads all assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        setAssignmentsNeedsWork(
          response.data.filter((item) => item.status === "Needs work")
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
          <dir className="title-container">
            <h1 className="title">Assignments needs work</h1>
            <hr className="title-line" />
          </dir>
          <table className="assignment-table">
            <thead>
              <tr className="assignment-table-list assignment-table-list-needswork">
                <th className="viewall-name">App name</th>
                <th className="viewall-description">Description</th>
                <th className="viewall-reviewer">Reviewer</th>
                <th className="viewall-feedback">Feedback</th>
                <th className="viewall-asssignment">Asssignment URL</th>
                <th className="viewall-branch">Branch</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {assignmentsNeedsWork.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="viewall-name-desktop">{assignment.name}</td>

                  {/* mobile */}
                  <td className="viewall-name-mobile">
                    {
                      <a href={assignment.asssignment} target="blank">
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
                      <a
                        className="feedback-link"
                        href={assignment.reviewVideoUrl}
                      >
                        Watch the feedback!
                      </a>
                    ) : (
                      "No feedback"
                    )}
                  </td>
                  <td className="viewall-asssignment">
                    <a
                      className="assignment-link"
                      href={assignment.asssignmentUrl}
                      target="blank"
                    >
                      <u>Asssignment link</u>
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

export default LearnerViewAllNeedsWork;
