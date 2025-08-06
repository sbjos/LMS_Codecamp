import { useEffect, useState } from "react";
import axios from "axios";
import ModalView from "../../components/learner/modal/ModalView";
import "../../css/ViewAll.css";

function LearnerViewAllInReview() {
  const [assignmentsInReview, setAssignmentsInReview] = useState([]);
  const token = localStorage.getItem("lmsusertoken");

  // automatically fetches and loads all assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        setAssignmentsInReview(
          response.data.filter((item) => item.status === "In review")
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
        <section className="viewall-section-1 viewall-section-1-inreview">
          <dir className="title-container">
            <h1 className="title">Assignments in review</h1>
            <hr className="title-line" />
          </dir>
        </section>
        <section className="viewall-section-2">
          <div className="empty-section"></div>
        </section>
        <section className="viewall-section-3">
          <table className="assignment-table">
            <thead>
              <tr className="assignment-table-list assignment-table-list-inreview">
                <th className="viewall-name">Assignment name</th>
                <th className="viewall-description">Description</th>
                <th className="viewall-reviewer">Reviewer</th>
                <th className="viewall-feedback">Feedback</th>
                <th className="viewall-asssignment">Assignment URL</th>
                <th className="viewall-branch">Branch</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {assignmentsInReview.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="viewall-name-desktop">{assignment.name}</td>

                  {/* mobile */}
                  <td className="viewall-name-mobile">
                    {
                      <a href={assignment.assignment} target="blank">
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
                  <td className="viewall-asssignment">
                    <a
                      className="assignment-link"
                      href={assignment.assignmentUrl}
                      target="blank"
                    >
                      <u>Assignment link</u>
                    </a>
                  </td>
                  <td className="viewall-branch">{assignment.branch}</td>
                  <td className="viewall-button">
                    {ModalView(assignment, "btn-card-link", "View")}
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

export default LearnerViewAllInReview;
