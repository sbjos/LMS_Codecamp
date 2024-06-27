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
  const authorityArray = cleanUserAuthority.split(", ");
  const user = authorityArray[1];

  // Validate a user's access to a webpage
  Validate(token, cleanUserAuthority);

  /**
   * automatically fetches and loads assignments by user
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assignments",
          { headers: { Authorization: "Bearer " + token } }
        );
        setAssignments(response.data.map((item) => item.assignment));

        console.log("response", response.data);
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

  const submitted = assignments.filter((item) => item.status === "Submitted");

  // RedirectButton component for New assignment button.
  const newAssignment = (
    <RedirectButton
      reference="learner-new-assignment"
      buttonName="New assignment"
      data={submitted}
    />
  );

  // Passes the data to the ReviewerMapping.jsx component to handle cards.
  return (
    <>
      <section>
        {/* Header */}
        <div className="dashboard-header">
          <h1>{user}'s Dashboard</h1>
          <h2>Welcome {user}</h2>
        </div>
        <div className="dashboard-navbar">
          {newAssignment}
          {logoutButton}
        </div>
        <hr className="separationline" />
        <div className="assignments-container">
          <div className="label-container">
            <label>Submitted</label>
          </div>
          <ul>{LearnerMapping(submitted)}</ul>

          <hr className="separationline" />

          <div className="label-container">
            <label>In review</label>
          </div>
          <ul>
            {LearnerMapping(
              assignments.filter((item) => item.status === "In review")
            )}
          </ul>

          <hr className="separationline" />

          <div className="label-container">
            <label>Needs work</label>
          </div>
          <ul>
            {LearnerMapping(
              assignments.filter((item) => item.status === "Needs work")
            )}
          </ul>

          <hr className="separationline" />

          <div className="label-container">
            <label>Completed</label>
          </div>
          <ul>
            {LearnerMapping(
              assignments.filter((item) => item.status === "Completed")
            )}
          </ul>
        </div>
      </section>
    </>
  );
}

export default LearnerDashboard;
