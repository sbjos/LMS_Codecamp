import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LearnerMapping from "../components/LearnerMapping";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import "../css/Dashboard.css";

function LearnerDashboard() {
  const logoutButton = (
    <RedirectButton reference="logout" buttonName="Logout" />
  );
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const authorityArray = userAuthority.split(", ");
  const firstname = authorityArray[1];

  // Validate a user's access to a webpage
  Validate(token, userAuthority);

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
        setAssignments(response.data);
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
      reference="learner-submit-assignment"
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
          <h1>{firstname}'s Dashboard</h1>
          <h2>Welcome {firstname}</h2>
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
              assignments
                .filter((item) => item.status === "Completed")
                .slice(-4)
            )}
          </ul>
          <div className="showall">
            <Link to="allcompleted">show all completed assignments</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default LearnerDashboard;
