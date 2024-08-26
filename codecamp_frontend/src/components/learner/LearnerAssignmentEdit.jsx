import { useRef, useState } from "react";
import axios from "axios";
import "../../css/ModalStyle.css";

function LearnerAssignmentEdit(assignments) {
  const [isDirty, setDirty] = useState(false);
  const assignment = assignments.assignments;
  const formRef = useRef(null);
  const id = assignment.id;
  const codeReviewer = assignment.codeReviewer;
  const feedback = assignment.reviewVideoUrl;
  const [githubUrl, setGithubUrl] = useState(assignment.githubUrl);
  const [branch, setBranch] = useState(assignment.branch);
  const token = localStorage.getItem("lmsusertoken");

  const handleClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateAssignment = { githubUrl, branch, codeReviewer };
      const response = await axios.put(
        "http://localhost:8080/api/assignments/" + id,
        updateAssignment,
        { headers: { Authorization: "Bearer " + token } }
      );
      if (response.status === 200) {
        alert("Assignment updated !");
        window.location.reload();
      }
    } catch (err) {
      if (!err) {
        console.error("No Server Response");
      } else if (err.response.status === 403) {
        alert("You have reached the limit of 10 unassigned assignments.");
      } else {
        console.error(err);
        alert("Failed to create the assignment !");
      }
    }
  };

  return (
    <>
      <div className="edit-assignment" key={id}>
        <div className="mb-3 assignment-input">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label form-label-custom"
          >
            Reviewer
          </label>
          <input
            type="text"
            className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
            id="exampleFormControlInput1"
            value={
              codeReviewer
                ? codeReviewer.firstname + " " + codeReviewer.lastname
                : "Unassigned"
            }
            disabled={true}
          />
        </div>

        <div className="mb-3 assignment-input">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label form-label-custom"
          >
            Feedback
          </label>
          {feedback ? (
            <a
              type="url"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-border-color input-box-shadow input-text-video-url-custom"
              id="exampleFormControlInput1"
              href={feedback}
              target="blank"
            >
              Watch the feedback!
            </a>
          ) : (
            <input
              type="text"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              id="exampleFormControlInput1"
              value="No feedback"
              disabled={true}
            />
          )}
        </div>

        <form
          className="edit-assignment-form"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="mb-3 assignment-input modal-form-input-custom">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label form-label-custom"
            >
              Github url
            </label>
            <input
              type="url"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              id="exampleFormControlInput1"
              value={githubUrl}
              onChange={handleChange(setGithubUrl)}
              required
            />
          </div>
          <div className="mb-4 assignment-input modal-form-input-custom">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label form-label-custom"
            >
              Branch
            </label>
            <input
              type="text"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              id="exampleFormControlInput1"
              value={branch}
              onChange={handleChange(setBranch)}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-success btn-custom"
            disabled={!isDirty}
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default LearnerAssignmentEdit;
