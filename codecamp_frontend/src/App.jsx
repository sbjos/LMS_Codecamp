import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PublicHomepage from "./pages/PublicHomepage.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx"
import LearnerRootOutlet from "./components/LearnerRootOutlet.jsx";
import LearnerDashboard from "./pages/LearnerDashboard.jsx";
import LearnerViewAllCompleted from "./pages/LearnerViewAllCompleted.jsx";
import LearnerViewAllSubmitted from "./pages/LearnerViewAllSubmitted.jsx";
import LearnerViewAllInReview from "./pages/LearnerViewAllInReview.jsx";
import LearnerViewAllNeedsWork from "./pages/LearnerViewAllNeedsWork.jsx";
import LearnerRequestOneOnOne from "./pages/LearnerRequestOneOnOne.jsx";
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
        path="/codecamp/:learnerName"
        element={<LearnerRootOutlet />}
      >
        <Route path="dashboard" element={<LearnerDashboard />} />
        <Route path="submitted" element={<LearnerViewAllSubmitted />} />
        <Route path="inreview" element={<LearnerViewAllInReview />} />
        <Route path="needswork" element={<LearnerViewAllNeedsWork />} />
        <Route path="completed" element={<LearnerViewAllCompleted />} />
        <Route path="request1on1" element={<LearnerRequestOneOnOne />} />
        <Route path="profile" element={<Profile />} />

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
