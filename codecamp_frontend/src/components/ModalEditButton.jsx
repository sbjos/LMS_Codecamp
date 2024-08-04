import LearnerAssignmentEdit from "./LearnerAssignmentEdit";

function ModalEditButton(assignment, buttonClass, buttonName) {
  const id = assignment.id;

  return (
    <>
      <a
        className={buttonClass}
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#edit-assignment-modal-${id}`}
      >
        {buttonName}
      </a>
      <div
        className="modal fade"
        id={`edit-assignment-modal-${id}`}
        tabIndex="-1"
        aria-labelledby={`edit-assignment-modal-label-"${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-custom">
          <div className="modal-content modal-content-custom">
            <div className="modal-header modal-header-custom">
              <h1
                className="modal-title  modal-title-custom"
                id={`edit-assignment-modal-label-${id}`}
              >
                {assignment.name}
              </h1>
              <h3
                className="form-label text-body-secondary modal-label-description"
                htmlFor="exampleFormControlInput1"
              >
                {assignment.description}
              </h3>
              <h3
                className="form-label text-body-secondary modal-label-status"
                htmlFor="exampleFormControlInput1"
              >
                {assignment.status}
              </h3>
            </div>
            <div className="modal-body">
              <LearnerAssignmentEdit assignments={assignment} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalEditButton;
