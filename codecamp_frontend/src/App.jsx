import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PublicHomepage from "./pages/public_pages/PublicHomepage.jsx";
import RegistrationPage from "./pages/public_pages/RegistrationPage.jsx";
import Login from "./pages/public_pages/Login.jsx";
import LearnerRootOutlet from "./components/learner/LearnerRootOutlet.jsx";
import LearnerDashboard from "./pages/learner/LearnerDashboard.jsx";
import LearnerViewAllCompleted from "./pages/learner/LearnerViewAllCompleted.jsx";
import LearnerViewAllSubmitted from "./pages/learner/LearnerViewAllSubmitted.jsx";
import LearnerViewAllInReview from "./pages/learner/LearnerViewAllInReview.jsx";
import LearnerViewAllNeedsWork from "./pages/learner/LearnerViewAllNeedsWork.jsx";
import LearnerRequestOneOnOne from "./pages/learner/LearnerRequestOneOnOne.jsx";
import ReviewerDashboard from "./pages/reviewer/ReviewerDashboard.jsx";
import ReviewerViewAllSubmitted from "./pages/reviewer/ReviewerViewAllSubmitted.jsx";
import ReviewerViewAllCompleted from "./pages/reviewer/ReviewerViewAllCompleted.jsx";
import ReviewerAssignmentView from "./pages/reviewer/ReviewerAssignmentView.jsx";
import WhitePage from "./components/WhitePage.jsx";
import ProfileOutlet from "./components/profile/ProfileOutlet.jsx";
import PersonalInfo from "./pages/profile/PersonalInfo.jsx";
import SigninInfo from "./pages/profile/SigninInfo.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/codecamp.com" element={<PublicHomepage />} />
      <Route path="/codecamp.com/register" element={<RegistrationPage />} />
      <Route path="/codecamp.com/auth" element={<WhitePage />} />
      <Route path="/codecamp.com/login" element={<Login />} />

      {/* Learner routes */}
      <Route path="/codecamp.com" element={<LearnerRootOutlet />}>
        <Route path="dashboard" element={<LearnerDashboard />} />
        <Route path="submitted" element={<LearnerViewAllSubmitted />} />
        <Route path="inreview" element={<LearnerViewAllInReview />} />
        <Route path="needswork" element={<LearnerViewAllNeedsWork />} />
        <Route path="completed" element={<LearnerViewAllCompleted />} />
        <Route path="request1on1" element={<LearnerRequestOneOnOne />} />
        <Route path="profile" element={<ProfileOutlet />}>
          <Route path="basic-info" element={<PersonalInfo />} />
          <Route path="security" element={<SigninInfo />} />
        </Route>
      </Route>
      {/* Reviewer routes */}
      <Route
        path="/codecamp.com/reviewerdashboard/:reviewerName"
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
