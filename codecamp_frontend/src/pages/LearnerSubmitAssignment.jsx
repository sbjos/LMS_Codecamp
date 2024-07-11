import { useState } from "react";
import axios from "axios";
import React, { useRef } from "react";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/SubmitAssignment.css";
import { useNavigate } from "react-router-dom";

function LearnerSubmitAssignment() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("");
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const authorityArray = userAuthority.split(", ");
  const urlPathVariable = authorityArray[1] + authorityArray[2];
  const dashboard = (
    <RedirectButton
      reference="learner-dashboard"
      buttonName="Dashboard"
      data={urlPathVariable}
    />
  );

  // Validate a user's access to a webpage
  Validate(token, userAuthority);

  // creates a new assignment
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
        alert("You can only have 4 unassigned assignments at a time.");
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
      <div className="create-header">
        <h1>Submit a new assignment</h1>
      </div>
      <div className="burger">
        <form ref={formRef} className="form-create" onSubmit={handleSubmit}>
          <div className="form-create-github">
            <label htmlFor="githuburl">Github</label>
            <input
              id="githuburl"
              type="text"
              value={githubUrl}
              onChange={(e) => {
                setGithubUrl(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-create-branch">
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
              }}
              required
            />
          </div>
        </form>
        <div className="form-create-button">
          <button onClick={handleClick}>Submit</button>
          {dashboard}
        </div>
      </div>
    </>
  );
}

export default LearnerSubmitAssignment;
