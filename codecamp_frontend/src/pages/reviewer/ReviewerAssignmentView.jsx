import { useEffect, useState, useConfirm } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RedirectUrl from "../../components/RedirectUrl";
import "../../css/AssignmentViews.css";

function ReviewerAssignmentView() {
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [reviewVideoUrl, setReviewVideoUrl] = useState("");
  const { id } = useParams(null);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const authorityArray = userAuthority.split(", ");
  const urlPathVariable = authorityArray[1] + authorityArray[2];
  const dashboardButton = (
    <RedirectUrl
      reference="reviewer-dashboard"
      buttonName="Dashboard"
      data={urlPathVariable}
    />
  );

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

  const user = assignment.user;

  /**
   * Submit the changes made to the assignment.
   * @param {*} e
   * @param {*} status
   * @returns
   */
  const handleSubmit = async (e, status) => {
    e.preventDefault();

    if (status === "In review") {
      try {
        const assignment = {
          reviewVideoUrl: assignment.reviewVideoUrl,
          status,
          user,
        };
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
        if (reviewVideoUrl == assignment.reviewVideoUrl) {
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
              navigate("../");
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

  const confirmReopen = (e) => {
    if (confirm("Are you sure you want to reopen this assignment?") === true) {
      handleSubmit(e, "In review");
    } else {
      return;
    }
  };

  /**
   * Allows to view or reopen a completed assignment, or edit an open assignment.
   * @returns assignment
   */
  function formOrNot() {
    if (assignment.status === "Completed") {
      return (
        <div>
          <div className="form-edit-github">
            <label htmlFor="githuburl">Github</label>
            <div className="input">
              <a
                className="inputText"
                href={assignment.githubUrl}
                target="blank"
              >
                {assignment.githubUrl}
              </a>
            </div>
          </div>
          <div className="form-edit-branch">
            <label htmlFor="branch">Branch</label>
            <input id="branch" placeholder={assignment.branch} disabled />
          </div>
          <div className="form-edit-review">
            <label htmlFor="reviewvideo">Review video</label>
            <div className="input">
              <a
                className="inputText"
                href={assignment.reviewVideoUrl}
                target="blank"
              >
                {assignment.reviewVideoUrl}
              </a>
            </div>
          </div>
          <div className="form-edit-button">
            {dashboardButton}
            <button onClick={(e) => confirmReopen(e)}>Reopen</button>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <form className="form-edit-video">
            <div className="form-edit-github">
              <label htmlFor="githuburl">Github</label>
              <div className="input">
                <a
                  className="inputText"
                  href={assignment.githubUrl}
                  target="blank"
                >
                  {assignment.githubUrl}
                </a>
              </div>
            </div>
            <div className="form-edit-branch">
              <label htmlFor="branch">Branch</label>
              <input id="branch" placeholder={assignment.branch} disabled />
            </div>
            <div className="form-edit-review">
              <label htmlFor="reviewvideo">Review video</label>
              <input
                id="reviewvideo"
                type="url"
                defaultValue={assignment.reviewVideoUrl}
                onChange={(e) => setReviewVideoUrl(e.target.value)}
                required
              />
            </div>
            <div className="form-edit-button">
              <button onClick={(e) => handleSubmit(e, "Completed")}>
                Completed
              </button>
              <button onClick={(e) => handleSubmit(e, "Needs work")}>
                Needs work
              </button>
              {dashboardButton}
            </div>
          </form>
        </>
      );
    }
  }

  return (
    <>
      <div className="edit-header">
        <h1>Assignment {assignment.number}</h1>
        <h2>Status: {assignment.status}</h2>
        <h2>Learner: {assignment.user.username}</h2>
        <div className="spaceBetween"></div>
      </div>
      <div className="burger">{formOrNot()}</div>
    </>
  );
}

export default ReviewerAssignmentView;
