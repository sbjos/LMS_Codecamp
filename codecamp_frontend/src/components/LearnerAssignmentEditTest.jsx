import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validate from "./Validate";
import "../css/ModalStyle.css";

function LearnerAssignmentEditTest(assignment) {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");

  // Validate a user's access to a webpage
  Validate(token, userAuthority);

  const handleClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const assignment = { githubUrl, branch };
      const response = await axios.post(
        "http://localhost:8080/api/assignments",
        assignment,
        { headers: { Authorization: "Bearer " + token } }
      );
      if (!response.status) {
        return <p>loading</p>;
      }
      if (response.status === 201) {
        alert("Assignment created !");
        navigate("../");
      }
    } catch (err) {
      if (!err) {
        console.error("No Server Response");
      } else if (err.response.status === 403) {
        alert("You have reached the limit of 6 unassigned assignments.");
        navigate("../");
      } else {
        console.error(err);
        alert("Failed to create the assignment !");
      }
    }
  };

  console.log("assignment", assignment);

  return (
    <>
      <div className="edit-assignment" key={id}>
        <ul className="list-group">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label text-body-secondary form-label-custom"
          >
            Project name
          </label>
          <li className="list-group-item">{assignment.name}</li>
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label text-body-secondary form-label-custom"
          >
            Project description
          </label>
          <li className="list-group-item">{assignment.description}</li>
          {assignment.reviewVideoUrl ? (
            <div>
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label text-body-secondary form-label-custom"
              >
                Reviewer's video feedback
              </label>
              <li className="list-group-item">
                <a className="inputText" href={reviewVideoUrl} target="blank">
                  {reviewVideoUrl}
                </a>
              </li>
            </div>
          ) : (
            ""
          )}
        </ul>
        <form
          className="edit-assignment-form"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="mb-3 assignment-input">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-body-secondary form-label-custom"
            >
              Github url
            </label>
            <input
              type="url"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              id="exampleFormControlInput1"
              placeholder="https://www.github.com/..."
              value={githubUrl}
              onChange={(e) => {
                setGithubUrl(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-4 assignment-input">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label text-body-secondary form-label-custom"
            >
              Branch
            </label>
            <input
              type="text"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              id="exampleFormControlInput1"
              placeholder="branch"
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
              }}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-success btn-custom"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default LearnerAssignmentEditTest;
