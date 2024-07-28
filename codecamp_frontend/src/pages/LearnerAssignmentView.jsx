import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Validate from "../components/Validate";
import "../css/AssignmentViews.css";

function LearnerAssignmentView() {
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState();
  const [branch, setBranch] = useState();
  const { id } = useParams();
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const authorityArray = userAuthority.split(", ");

  // Validate a user's access to a webpage
  Validate(token, authorityArray);

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

  const status = assignment.status;

  // Updates an assignment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const codeReviewer = assignment.codeReviewer;
    if (
      (!githubUrl && !branch) ||
      githubUrl == assignment.githubUrl ||
      branch == assignment.branch
    ) {
      alert("No changes detected");
    } else {
      try {
        const assignment = { githubUrl, branch, status, codeReviewer };
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
          navigate("../");
        }
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else if (err.response.status === 403) {
          alert(
            "To many open assignments. You can only have 4 submitted at a time."
          );
          navigate("../");
        } else {
          console.error(err);
          alert("Failed to update the assignment !");
        }
      }
    }
  };

  function formOrNot() {
    const status = assignment.status;
    const reviewVideoUrl = assignment.reviewVideoUrl
      ? assignment.reviewVideoUrl
      : "";

    if (status == "Submitted") {
      return (
        <>
          <div className="form-edit-github">
            <label htmlFor="githuburl">Github</label>
            <input
              id="reviewvideo"
              type="url"
              defaultValue={assignment.githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-edit-branch">
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              defaultValue={assignment.branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          {reviewVideoUrl ? (
            <div className="form-create-box">
              <label htmlFor="reviewVideo">Review video</label>
              <div className="input">
                <a className="inputText" href={reviewVideoUrl} target="blank">
                  {reviewVideoUrl}
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="form-edit-button">
            <button onClick={handleSubmit}>Submit</button>
            {/* {dashboardButton} */}
          </div>
        </>
      );
    }
    if (status == "Needs work") {
      return (
        <>
          <div className="form-edit-github">
            <label htmlFor="githuburl">Github</label>
            <input
              id="reviewvideo"
              type="url"
              defaultValue={assignment.githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-edit-branch">
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              defaultValue={assignment.branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          <div className="form-create-box">
            <label htmlFor="reviewVideo">Review video</label>
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
            <button onClick={handleSubmit}>Submit</button>
            {/* {dashboardButton} */}
          </div>
        </>
      );
    }
    if (status === "In review") {
      return (
        //  ------------------------------
        <>
          <div className="assignment-view-section-2">
            <div className="mb-3 assignment-input">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Github url
              </label>
              <div
                className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
                id="exampleFormControlInput1"
              >
                <a
                  // className="inputText"
                  href={assignment.githubUrl}
                  target="blank"
                >
                  {assignment.githubUrl}
                </a>
              </div>
            </div>
            <div className="mb-4 assignment-input">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Branch
              </label>
              <div
                // type="text"
                className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
                id="exampleFormControlInput1"
              >
                {assignment.branch}
              </div>
            </div>
            {/* <button
              type="button"
              class="btn btn-success btn-custom"
              onClick={handleClick}
            >
              Submit
            </button> */}
            {/* </form> */}
          </div>
        </>
        //   -----------------------------

        // <>
        //   <div className="form-edit-github">
        //     <label htmlFor="githuburl">Github</label>
        //     <div className="input">
        //       <a
        //         className="inputText"
        //         href={assignment.githubUrl}
        //         target="blank"
        //       >
        //         {assignment.githubUrl}
        //       </a>
        //     </div>
        //   </div>
        //   <div className="form-edit-branch">
        //     <label htmlFor="branch">Branch</label>
        //     <input
        //       id="branch"
        //       type="text"
        //       defaultValue={assignment.branch}
        //       disabled
        //     />
        //   </div>
        //   {reviewVideoUrl ? (
        //     <div className="form-create-box">
        //       <label htmlFor="reviewVideo">Review video</label>
        //       <div className="input">
        //         <a className="inputText" href={reviewVideoUrl} target="blank">
        //           {reviewVideoUrl}
        //         </a>
        //       </div>
        //     </div>
        //   ) : (
        //     ""
        //   )}
        //   {/* <div className="form-edit-button">{dashboardButton}</div> */}
        // </>
      );
    }
    if (status === "Completed") {
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
          {/* <div className="form-edit-button">{dashboardButton}</div> */}
        </div>
      );
    }
  }

  return (
    <>
      <div class="assignment-view-root">
        {/* section-1 */}
        <div className="assignment-view-section-1">
          <h1>Assignment {assignment.name}</h1>
          <h2>Assignment {assignment.name}</h2>
          <h2>Status: {assignment.status}</h2>
          <h2>
            Reviewer:{" "}
            {assignment.codeReviewer
              ? assignment.codeReviewer.firstname +
                " " +
                assignment.codeReviewer.lastname
              : "Unassigned"}
          </h2>
          <div className="spaceBetween"></div>
        </div>

        {/* section-2 */}
        <div className="burger">{formOrNot()}</div>

        {/* section-3 */}
        <div className="assignment-view-section-3"></div>
      </div>
    </>
  );
}

export default LearnerAssignmentView;
