import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";

function ReviewerAssignmentView() {
  const dashboard = RedirectButton("reviewer", "Dashboard");
  const navigate = useNavigate();
  // const [status, setStatus] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [reviewVideoUrl, setReviewVideoUrl] = useState("");
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

  const user = assignment.assignment.user;

  // Submit the updated assignment by updating the status and the video url
  const handleClick = async (e, status) => {
    e.preventDefault();

    if (!reviewVideoUrl) {
      alert("Please add a review video.");
    } else {
      if (reviewVideoUrl == assignment.assignment.reviewVideoUrl) {
        alert("No changes detected");
      } else {
        try {
          const assignment = { reviewVideoUrl, status, user };
          const response = await axios.put(
            "http://localhost:8080/api/assignments/" + id,
            assignment,
            { headers: { Authorization: "Bearer " + token } }
          );
          if (response.status === 200) {
            alert("Assignment updated !");
            navigate("/api/reviewer/dashboard");
          }
        } catch (err) {
          if (!err) {
            console.error("No server response");
          } else {
            console.error(err);
            alert("Failed to update the assignment !");
          }
        }
      }
    }
  };

  const reopenAssignment = async (e) => {
    e.preventDefault();

    setReviewVideoUrl(assignment.assignment.reviewVideoUrl);
    try {
      const status = "Needs work";
      const assignment = { reviewVideoUrl, status, user };
      const response = await axios.put(
        "http://localhost:8080/api/assignments/" + id,
        assignment,
        { headers: { Authorization: "Bearer " + token } }
      );
      if (!response.status) {
        return <p>loading</p>;
      }
      if (response.status === 200) {
        alert("Assignment re-opened");
        window.location.reload();
      }
    } catch (err) {
      if (!err) {
        console.error("No server response");
      } else {
        console.error(err);
        alert("This learner has to many open assignments at the moment.");
      }
    }
  };

  // Allows to view or reopen a completed assignment.
  function formOrNot() {
    if (assignment.assignment.status === "Completed") {
      return (
        <div>
          <div className="form-edit-review">
            <label htmlFor="reviewvideo">Review video</label>
            <input
              id="reviewvideo"
              type="text"
              placeholder={assignment.assignment.reviewVideoUrl}
              onChange={(e) => {
                setReviewVideoUrl(e.target.value);
              }}
            />
          </div>
          <div className="form-edit-button">
            {dashboard}
            <button onClick={reopenAssignment}>Reopen</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <form className="form-edit-video">
            <div className="form-edit-review">
              <label htmlFor="reviewvideo">Review video</label>
              <input
                id="reviewvideo"
                type="text"
                defaultValue={
                  reviewVideoUrl
                    ? reviewVideoUrl
                    : assignment.assignment.reviewVideoUrl
                }
                onChange={(e) => {
                  setReviewVideoUrl(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-edit-button">
              <button
                onClick={(e) => {
                  handleClick(e, "Completed");
                }}
              >
                Completed
              </button>
              <button
                onClick={(e) => {
                  handleClick(e, "Needs work");
                }}
              >
                Needs work
              </button>
              {dashboard}
            </div>
          </form>
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
        <div className="form-edit-github">
          <label htmlFor="githuburl">Github</label>
          <input
            id="githuburl"
            placeholder={assignment.assignment.githubUrl}
            disabled
          />
        </div>
        <div className="form-edit-branch">
          <label htmlFor="branch">Branch</label>
          <input
            id="branch"
            placeholder={assignment.assignment.branch}
            disabled
          />
        </div>
        <div>{formOrNot()}</div>
      </div>
    </>
  );
}

export default ReviewerAssignmentView;
