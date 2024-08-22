const RootUrl = "/codecamp";
const Profile = RootUrl + "/profile";

const RedirectUrl = {
  // Learner
  Homepage: RootUrl,
  Register: RootUrl + "/register",
  Login: RootUrl + "/login",
  learnerdashboard: RootUrl + "/mydashboard",
  learnerSubmittedAssignments: RootUrl + "/submitted",
  learnerInReviewAssignments: RootUrl + "/inreview",
  learnerNeedsWorkAssignments: RootUrl + "/needswork",
  learnerCompletedAssignments: RootUrl + "/completed",
  LearnerRequestOneOnOne: RootUrl + "/request1on1",
  Profile: Profile + "/basic-info",
  ProfileBasicInfo: Profile + "/basic-info",
  ProfileSecurity: Profile + "/security",

  // Reviewer url
  reviewerDashboard: RootUrl + "/myreviewerdashboard",
  reviewerAssignmentView: RootUrl + "/assignment/",

  // Admin url
  adminDashboard: RootUrl + "/admin",
};

export default RedirectUrl;
