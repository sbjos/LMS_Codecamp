import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";

function ReviewerAssignmentView() {
  const dashboardButton = (
    <RedirectButton reference="reviewer" buttonName="Dashboard" />
  );
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [reviewVideoUrl, setReviewVideoUrl] = useState("");
  const { id } = useParams(null);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority;

  // Validates a user's access to a webpage.
  Validate(token, cleanUserAuthority);

  /**
   * Fetches and loads the assignment by ID.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments/" + id,
          { headers: { Authorization: "Bearer " + token } }
        );
        setAssignment(response.data);
        console.log("assignment", assignment); // CONSOLE
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else {
          console.error(err);
          alert("Failed to retireve the assignment!");
        }
      }
    };
    fetchData();
  }, []);

  /**
   * Return a loading state while fetching data
   */
  if (!assignment) {
    setTimeout(() => {}, 10000);
    return <div>Loading...</div>;
  }

  const user = assignment.assignment.user;

  /**
   * Submit the changes made to the assignment.
   * @param {*} e
   * @param {*} status
   * @returns
   */
  const handleClick = async (e, status) => {
    e.preventDefault();

    if (status === "In review") {
      setReviewVideoUrl(assignment.assignment.reviewVideoUrl);
      try {
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
        }
        if (err.response.status === 403) {
          alert("This learner has to many open assignments at this time.");
          console.error(err);
        } else {
          console.error(err);
          alert("Failed to claim the assignment!");
        }
      }
    } else {
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
            }
            if (err.response.status === 403) {
              alert(
                "This learner has too many assignments in 'Needs work' status."
              );
            } else {
              console.error(err);
              alert("Failed to update the assignment!");
            }
          }
        }
      }
    }
  };

  /**
   * Allows to view or reopen a completed assignment, or edit an open assignment.
   * @returns assignment
   */
  function formOrNot() {
    if (assignment.assignment.status === "Completed") {
      return (
        <div>
          <div className="form-edit-review">
            <label htmlFor="reviewvideo">Review video</label>
            <input
              id="reviewvideo"
              placeholder={assignment.assignment.reviewVideoUrl}
              disabled
              onChange={(e) => {
                setReviewVideoUrl(e.target.value);
              }}
            />
          </div>
          <div className="form-edit-button">
            {dashboardButton}
            <button onClick={(e) => handleClick(e, "In review")}>Reopen</button>
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
              {dashboardButton}
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
