import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/AssignmentViews.css";

function LearnerAssignmentView() {
  const redirect = RedirectButton("learner", "Dashboard");
  const [assignment, setAssignment] = useState(null);
  const [githubUrl, setGithubUrl] = useState(null);
  const [branch, setBranch] = useState(null);
  const { id } = useParams(null);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority
    ? cleanUserAuthority.split(", ")
    : "";

  // Validate a user's access to a webpage
  Validate(token, cleanUserAuthority);

  // automatically fetches and loads the assignment by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments/" + id,
          { headers: { Authorization: "Bearer " + token } }
        );
        setAssignment(response.data);
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

  // Handles loading of data fetching
  if (!assignment) {
    return <div>Loading...</div>;
  }

  const status = assignment.assignment.status;
  console.log("response", status); // TODO: Remove;

  // Updates an assignment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (!githubUrl && !branch) ||
      githubUrl == assignment.assignment.githubUrl ||
      branch == assignment.assignment.branch
    ) {
      alert("No changes detected");
    } else {
      try {
        const assignment = { githubUrl, branch, status };
        const response = await axios.put(
          "http://localhost:8080/api/assignments/" + id,
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
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else if (err.response.status === 403) {
          alert(
            "To many open assignments. You can only have 4 submitted at a time."
          );
          window.location.assign("/api/dashboard");
        } else {
          console.error(err);
          alert("Failed to update the assignment !");
        }
      }
    }
  };

  function reviewVideo() {
    if (assignment.assignment.status == "Needs work") {
      return (
        <div className="form-create-box">
          <label htmlFor="reviewVideo">Review video</label>
          <input
            id="reviewVideo"
            placeholder={assignment.assignment.reviewVideoUrl}
            disabled
          />
        </div>
      );
    }
  }

  return (
    <>
      <div className="edit-header">
        <h1>Assignment {assignment.assignment.number}</h1>
        <h2>{assignment.assignment.status}</h2>
      </div>
      <div className="burger">
        <form className="form-edit" onSubmit={handleSubmit}>
          <div className="form-edit-github">
            <label htmlFor="githuburl">Github</label>
            <input
              id="githuburl"
              type="text"
              defaultValue={
                githubUrl ? githubUrl : assignment.assignment.githubUrl
              }
              onChange={(e) => {
                setGithubUrl(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-edit-branch">
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              defaultValue={branch ? branch : assignment.assignment.branch}
              onChange={(e) => {
                setBranch(e.target.value);
              }}
              required
            />
          </div>
          {reviewVideo(assignment)}
          <div className="form-edit-button">
            <button>Submit</button>
            {redirect}
          </div>
        </form>
      </div>
    </>
  );
}

export default LearnerAssignmentView;
