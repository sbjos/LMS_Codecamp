import LearnerAssignmentView from "./LearnerAssignmentView";

function ModalViewButton(assignment, buttonClass, buttonName) {
  const id = assignment.id;

  return (
    <>
      <a
        className={buttonClass}
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#view-assignment-modal-${id}`}
      >
        {buttonName}
      </a>
      <div
        className="modal fade"
        id={`view-assignment-modal-${id}`}
        tabIndex="-1"
        aria-labelledby={`view-assignment-modal-label-"${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-custom">
          <div className="modal-content modal-content-custom">
            <div className="modal-header modal-header-custom">
              <h1
                className="modal-title fs-4 modal-title-custom"
                id={`view-assignment-modal-label-${id}`}
              >
                {assignment.name}
              </h1>
              <p
                className="form-label text-body-secondary modal-label-description"
                htmlFor="exampleFormControlInput1"
              >
                <p>{assignment.description}</p>
              </p>
              <h3
                className="form-label text-body-secondary modal-label-status"
                htmlFor="exampleFormControlInput1"
              >
                {assignment.status}
              </h3>
            </div>
            <div className="modal-body">
              <LearnerAssignmentView assignments={assignment} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalViewButton;
