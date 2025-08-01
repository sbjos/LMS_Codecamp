import { useState } from "react";
import React, { useRef } from "react";
import axios from "axios";
import "../../css/ModalStyle.css";

function LearnerSubmitAssignment() {
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignmentUrl, setassignmentUrl] = useState("");
  const [branch, setBranch] = useState("");
  const token = localStorage.getItem("lmsusertoken");

  // creates a new assignment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const assignment = { name, description, assignmentUrl, branch };
      const response = await axios.post(
        "http://localhost:8080/api/assignments",
        assignment,
        { headers: { Authorization: "Bearer " + token } }
      );
      if (!response.status) {
        return <p>loading</p>;
      }
      if (response.status === 201) {
        alert("Assignment created !");
        location.reload();
      }
    } catch (err) {
      if (!err) {
        console.error("No Server Response");
      } else if (err.response.status === 403) {
        location.reload();
        alert("You have reached the limit of 10 unassigned assignments.");
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
      <div className="create-assignment">
        <form
          className="create-assignment-form"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="mb-3 assignment-input">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label form-label-custom"
            >
              Project name<span className="form-required">*</span>
            </label>
            <input
              type="text"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              id="exampleFormControlInput1"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3 assignment-input">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label form-label-custom"
            >
              Project description<span className="form-required">*</span>
            </label>

            <textarea
              textarea="true"
              rows={2}
              type="text"
              maxLength={60}
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              id="exampleFormControlInput1"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3 assignment-input">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label form-label-custom"
            >
              Assignment url<span className="form-required">*</span>
            </label>
            <input
              type="url"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              id="exampleFormControlInput1"
              placeholder="https://www.github.com/..."
              value={assignmentUrl}
              onChange={(e) => {
                setassignmentUrll(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-4 assignment-input">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label form-label-custom"
            >
              Branch<span className="form-required">*</span>
            </label>
            <input
              type="text"
              className="form-control border border-secondary p-2 mb-2 border-opacity-75 input-box-shadow"
              id="exampleFormControlInput1"
              placeholder="branch"
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
              }}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-success btn-custom"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default LearnerSubmitAssignment;
