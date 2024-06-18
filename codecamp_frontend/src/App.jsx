import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicHomepage from "./pages/PublicHomepage";
import Login from "./pages/Login";
import LearnerDashboard from "./pages/LearnerDashboard";
import LearnerAssignmentView from "./pages/LearnerAssignmentView";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import AllSubmitted from "./pages/AllSubmitted";
import ReviewerAssignmentView from "./pages/ReviewerAssignmentView";
import SubmitAssignment from "./pages/SubmitAssignment";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/codecamp" element={<PublicHomepage />} />
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/api/dashboard" element={<LearnerDashboard />} />
        <Route path="/api/assignment/:id" element={<LearnerAssignmentView />} />
        <Route path="/api/reviewer/dashboard" element={<ReviewerDashboard />} />
        <Route
          path="/api/reviewer/dashboard/allsubmitted"
          element={<AllSubmitted />}
        />
        <Route
          path="/api/reviewer/assignment/:id"
          element={<ReviewerAssignmentView />}
        />
        <Route path="/api/submitassignment" element={<SubmitAssignment />} />
        <Route
          path="*"
          element={
            <>
              <h1 style={{ fontWeight: "500" }}>404 not found</h1>
              <h3 style={{ fontWeight: "400" }}>
                The requested URL was not found on this server.
              </h3>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
