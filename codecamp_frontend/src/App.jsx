import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PublicHomepage from "./pages/PublicHomepage.jsx";
import Login from "./pages/Login.jsx";
import LearnerRootOutlet from "./components/LearnerRootOutlet.jsx";
import LearnerDashboard from "./pages/LearnerDashboard.jsx";
import LearnerAssignmentView from "./pages/LearnerAssignmentView.jsx";
import LearnerViewAllCompleted from "./pages/LearnerViewAllCompleted.jsx";
import ReviewerDashboard from "./pages/ReviewerDashboard.jsx";
import ReviewerViewAllSubmitted from "./pages/ReviewerViewAllSubmitted.jsx";
import ReviewerViewAllCompleted from "./pages/ReviewerViewAllCompleted.jsx";
import ReviewerAssignmentView from "./pages/ReviewerAssignmentView.jsx";
import WhitePage from "./pages/WhitePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/codecamp" element={<PublicHomepage />} />
      <Route path="/codecamp/auth" element={<WhitePage />} />
      <Route path="/codecamp/login" element={<Login />} />

      {/* Learner routes */}
      <Route
        path="/codecamp/dashboard/:learnerName"
        element={<LearnerRootOutlet />}
      >
        <Route index element={<LearnerDashboard />} />
        <Route path="assignment/:id" element={<LearnerAssignmentView />} />
        <Route path="completed" element={<LearnerViewAllCompleted />} />
      </Route>

      {/* Reviewer routes */}
      <Route
        path="/codecamp/reviewerdashboard/:reviewerName"
        element={<LearnerRootOutlet />}
      >
        <Route index element={<ReviewerDashboard />} />
        <Route path="assignment/:id" element={<ReviewerAssignmentView />} />
        <Route path="allsubmitted" element={<ReviewerViewAllSubmitted />} />
        <Route path="completed" element={<ReviewerViewAllCompleted />} />
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
