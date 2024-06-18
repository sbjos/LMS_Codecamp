import { useState } from "react";
import axios from "axios";
import React, { useRef } from "react";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/SubmitAssignment.css";

function SubmitAssignment() {
  const dashboard = RedirectButton("learner", "Dashboard");
  const formRef = useRef(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("");
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority
    ? cleanUserAuthority.split(", ")
    : "";
  const user = authorityArray[0];

  // Validate a user's access to a webpage
  Validate(token, cleanUserAuthority);

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
      if (response.status === 200) {
        alert("Assignment updated !");
        window.location.assign("/api/dashboard");
      }
      if (response.status === 201) {
        alert("Assignment created !");
        window.location.assign("/api/dashboard");
      }
      console.log(response);
    } catch (err) {
      if (!err) {
        console.error("No Server Response");
      } else if (err.response.status === 403) {
        alert("You can only have 4 unassigned assignments at a time.");
        window.location.assign("/api/dashboard");
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

export default SubmitAssignment;
