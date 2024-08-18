import LearnerSubmitAssignment from "../LearnerSubmitAssignment";
import "../../../css/ModalStyle.css";

function ModalNewAssignment() {
  return (
    <>
      <button
        type="button"
        className="btn btn-warning btn-md welcome-section-text-btn-new-assignment"
        data-bs-toggle="modal"
        data-bs-target="#new-assignment-modal"
      >
        New assignment
      </button>
      <div
        className="modal fade"
        id="new-assignment-modal"
        tabIndex="-1"
        aria-labelledby="new-assignment-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-custom">
          <div className="modal-content modal-content-custom">
            <div className="modal-header modal-header-custom">
              <h1
                className="modal-title modal-title-custom"
                id="new-assignment-modal-label"
              >
                Create a new assignment
              </h1>
            </div>
            <div className="modal-body">{<LearnerSubmitAssignment />}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalNewAssignment;
