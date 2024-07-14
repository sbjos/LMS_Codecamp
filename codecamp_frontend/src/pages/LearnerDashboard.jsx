import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LearnerMapping from "../components/LearnerMapping";
import Validate from "../components/Validate";
import RedirectButton from "../components/RedirectButton";
import Logout from "../components/Logout";
import "../css/Dashboard.css";

function LearnerDashboard() {
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
        <hr className="separationline" />
        <div className="assignments-container">
          <div className="label-container">
            <label>Submitted</label>
          </div>
          <ul class="status-container">{LearnerMapping(submitted)}</ul>

          <hr className="separationline" />

          <div className="label-container">
            <label>In review</label>
          </div>
          <ul class="status-container">
            {LearnerMapping(
              assignments.filter((item) => item.status === "In review")
            )}
          </ul>

          <hr className="separationline" />

          <div className="label-container">
            <label>Needs work</label>
          </div>
          <ul class="status-container">
            {LearnerMapping(
              assignments.filter((item) => item.status === "Needs work")
            )}
          </ul>

          <hr className="separationline" />

          <div className="label-container">
            <label>Completed</label>
          </div>
          <ul class="status-container">
            {LearnerMapping(
              assignments
                .filter((item) => item.status === "Completed")
                .slice(-4)
            )}
          </ul>
          <div className="showall"></div>
        </div>
      </section>
    </>
  );
}

export default LearnerDashboard;
