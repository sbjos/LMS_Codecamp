import { useState, useEffect } from "react";
import axios from "axios";
import LearnerMapping from "../components/LearnerMapping";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/Dashboard.css";

function LearnerDashboard() {
  const [assignments, setAssignments] = useState([]);
  const logoutButton = (
    <RedirectButton reference="logout" buttonName="Logout" />
  );
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const cleanUserAuthority = userAuthority ? userAuthority.trim() : "";
  const authorityArray = cleanUserAuthority
    ? cleanUserAuthority.split(", ")
    : "";
  const user = authorityArray[0];

  // Validate a user's access to a webpage
  Validate(token, cleanUserAuthority);

  // automatically fetches and loads assignments by user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        setAssignments(response.data);

        console.log("response", response.data); // CONSOLE
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

  // Assignments by status
  const submitted = assignments.filter(
    (item) => item.assignment.status === "Submitted"
  );
  const inReview = assignments.filter(
    (item) => item.assignment.status === "In review"
  );
  const needsWork = assignments.filter(
    (item) => item.assignment.status === "Needs work"
  );
  const completed = assignments.filter(
    (item) => item.assignment.status === "Completed"
  );

  // Passing data to the RedirectButton component and data to prevent more than 4 submitted assignments
  const newAssignment = (
    <RedirectButton
      reference="new-assignment"
      buttonName="New assignment"
      data="submitted"
    />
  );

  return (
    <>
      <section>
        {/* Header */}
        <div className="dashboard-header">
          <h1>{user}'s Dashboard</h1>
          <h2>Welcome {user}</h2>
        </div>
        <div className="dashboard-navbar">
          {/* <button onClick={handleClick}>new assignment</button> */}
          {newAssignment}
          {logoutButton}
        </div>
        <hr className="separationline" />
        {/* Assignment containers */}
        <div className="assignments-container">
          <div className="label-container">
            <label>Submitted</label>
          </div>
          <ul>{LearnerMapping(submitted)}</ul>

          <hr className="separationline" />

          <div className="label-container">
            <label>In review</label>
          </div>
          <ul>{LearnerMapping(inReview)}</ul>

          <hr className="separationline" />

          <div className="label-container">
            <label>Needs work</label>
          </div>
          <ul>{LearnerMapping(needsWork)}</ul>

          <hr className="separationline" />

          <div className="label-container">
            <label>Completed</label>
          </div>
          <ul>{LearnerMapping(completed)}</ul>
        </div>
      </section>
    </>
  );
}

export default LearnerDashboard;
