import "../css/ModalStyle.css";

function LearnerAssignmentView(assignments) {
  const assignment = assignments.assignments;

  return (
    <>
      <div className="edit-assignment" key={assignment.id}>
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
              assignment.codeReviewer
                ? assignment.codeReviewer.firstname +
                  " " +
                  assignment.codeReviewer.lastname
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
          {assignment.reviewVideoUrl ? (
            <a
              type="url"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-border-color input-box-shadow input-text-video-url-custom"
              id="exampleFormControlInput1"
              href={assignment.reviewVideoUrl}
              target="blank"
            >
              Watch the feedback!
            </a>
          ) : (
            <input
              type="text"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              id="exampleFormControlInput1"
              value={"No feedback"}
              disabled={true}
            />
          )}
        </div>
        <div className="mb-3 assignment-input">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label form-label-custom"
          >
            Github url
          </label>

          <a
            type="url"
            className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-border-color input-box-shadow input-text-video-url-custom"
            id="exampleFormControlInput1"
            href={assignment.githubUrl}
            target="blank"
          >
            {assignment.githubUrl}
          </a>
        </div>
        <div className="mb-4 assignment-input">
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
            value={assignment.branch}
            disabled={true}
          />
        </div>
      </div>
    </>
  );
}

export default LearnerAssignmentView;
