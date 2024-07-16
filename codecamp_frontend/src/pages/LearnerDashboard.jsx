import { useState, useEffect } from "react";
import axios from "axios";
import LearnerMapping from "../components/LearnerMapping";
import Validate from "../components/Validate";
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

  // Passes the data to the ReviewerMapping.jsx component to handle cards.
  return (
    <>
      <section>
        <div className="assignments-container">
          <div className="label-container">
            <label>Submitted</label>
          </div>
          <ul className="card-container">
            {LearnerMapping(
              submitted,
              "card text-center p-3 border border-info card-custom",
              "btn btn-outline-info"
            )}
          </ul>

          <hr className="separation-line" />

          <div className="label-container">
            <label>In review</label>
          </div>
          <ul className="card-container">
            {LearnerMapping(
              assignments.filter((item) => item.status === "In review"),
              "card text-center p-3 border border-warning card-custom",
              "btn btn-outline-warning"
            )}
          </ul>

          <hr className="separation-line" />

          <div className="label-container">
            <label>Needs work</label>
          </div>
          <ul className="card-container">
            {LearnerMapping(
              assignments.filter((item) => item.status === "Needs work"),
              "card text-center p-3 border border-danger card-custom",
              "btn btn-outline-danger"
            )}
          </ul>

          <hr className="separation-line" />

          <div className="label-container">
            <label>Completed</label>
          </div>
          <ul className="card-container">
            {LearnerMapping(
              assignments
                .filter((item) => item.status === "Completed")
                .slice(-4),
              "card text-center p-3 border border-success card-custom",
              "btn btn-outline-success"
            )}
          </ul>
          <div className="showall"></div>
        </div>
      </section>
    </>
  );
}

export default LearnerDashboard;
