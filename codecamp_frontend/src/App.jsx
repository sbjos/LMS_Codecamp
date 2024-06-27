import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicHomepage from "./pages/PublicHomepage";
import Login from "./pages/Login";
import LearnerDashboard from "./pages/LearnerDashboard";
import LearnerAssignmentView from "./pages/LearnerAssignmentView";
import LearnerSubmitAssignment from "./pages/LearnerSubmitAssignment";
import LearnerViewAllCompleted from "./pages/LearnerViewAllCompleted";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import ReviewerViewAllSubmitted from "./pages/ReviewerViewAllSubmitted";
import ReviewerViewAllCompleted from "./pages/ReviewerViewAllCompleted";
import ReviewerAssignmentView from "./pages/ReviewerAssignmentView";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/codecamp" element={<PublicHomepage />} />
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/api/dashboard" element={<LearnerDashboard />} />
        <Route path="/api/assignment/:id" element={<LearnerAssignmentView />} />
        <Route path="/api/allcompleted" element={<LearnerViewAllCompleted />} />
        <Route path="/api/reviewer/dashboard" element={<ReviewerDashboard />} />
        <Route
          path="/api/reviewer/allsubmitted"
          element={<ReviewerViewAllSubmitted />}
        />
        <Route
          path="/api/reviewer/allcompleted"
          element={<ReviewerViewAllCompleted />}
        />
        <Route
          path="/api/reviewer/assignment/:id"
          element={<ReviewerAssignmentView />}
        />
        <Route
          path="/api/submitassignment"
          element={<LearnerSubmitAssignment />}
        />
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
