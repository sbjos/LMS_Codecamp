import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
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
import RootOutlet from "./components/RootOutlet.jsx";
import WhitePage from "./pages/WhitePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/codecamp" element={<RootOutlet />}>
        <Route index element={<PublicHomepage />} />
        <Route path="auth" element={<WhitePage />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Learner routes */}
      <Route path="/codecamp/dashboard/:learnerName" element={<RootOutlet />}>
        <Route index element={<LearnerDashboard />} />
        <Route path="assignment/:id" element={<LearnerAssignmentView />} />
        <Route path="submitassignment" element={<LearnerSubmitAssignment />} />
        <Route path="allcompleted" element={<LearnerViewAllCompleted />} />
      </Route>

      {/* Reviewer routes */}
      <Route
        path="/codecamp/reviewer/dashboard:reviewerName"
        element={<RootOutlet />}
      >
        <Route index element={<ReviewerDashboard />} />
        <Route path="assignment/:id" element={<ReviewerAssignmentView />} />
        <Route path="allsubmitted" element={<ReviewerViewAllSubmitted />} />
        <Route path="allcompleted" element={<ReviewerViewAllCompleted />} />
      </Route>

      {/* 404 not found */}
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
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
