import { useState } from "react";
import axios from "axios";
import React, { useRef } from "react";
import Validate from "../components/Validate";
import { useNavigate } from "react-router-dom";
import "../css/SubmitAssignment.css";

function LearnerSubmitAssignment() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("");
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");

  // Validate a user's access to a webpage
  Validate(token, userAuthority);

  // creates a new assignment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const assignment = { name, description, githubUrl, branch };
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

  const handleClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <>
      <div class="create-assignment-root">
        {/* section-1 */}
        <div className="create-assignment-section-1"></div>

        {/* section-2 */}
        <div className="create-assignment-section-2">
          <form
            className="create-assignment-form"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="mb-3 assignment-input">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Project name
              </label>
              <input
                type="text"
                className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
                id="exampleFormControlInput1"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3 assignment-input">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Project description
              </label>

              <textarea
                textarea
                rows={2}
                type="text"
                maxLength={60}
                className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
                id="exampleFormControlInput1"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3 assignment-input">
              <label htmlFor="exampleFormControlInput1" className="form-label">
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
                className="form-label"
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
              class="btn btn-success btn-custom"
              onClick={handleClick}
            >
              Submit
            </button>
          </form>
        </div>

        {/* section-3 */}
        <div className="create-assignment-section-3"></div>
      </div>
    </>
  );
}

export default LearnerSubmitAssignment;
