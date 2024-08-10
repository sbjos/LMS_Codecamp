const userAuthority = localStorage.getItem("lmsuserauthorities");
const authorityArray = userAuthority ? userAuthority.split(", ") : "";
const urlPathVariable = authorityArray[1] + authorityArray[2];
const learnerRootUrl = "/codecamp/" + urlPathVariable;
const reviewerRootUrl = "/codecamp/reviewerdashboard/" + urlPathVariable;
const adminRootUrl = "/codecamp/admindashboard/" + urlPathVariable;

const RedirectUrl = {
  // Learner url  
  learnerdashboard: learnerRootUrl + "/dashboard",
  learnerSubmittedAssignments: learnerRootUrl + "/submitted",
  learnerInReviewAssignments: learnerRootUrl + "/inreview",
  learnerNeedsWorkAssignments: learnerRootUrl + "/needswork",
  learnerCompletedAssignments: learnerRootUrl + "/completed",
  LearnerRequestOneOnOne: learnerRootUrl + "/request1on1",
  Profile: learnerRootUrl + "/profile",

  // Reviewer url
  reviewerDashboard: reviewerRootUrl + "/dashboard",
  reviewerAssignmentView: reviewerRootUrl + "/assignment/",

  // Admin url
  adminDashboard: adminRootUrl + "/dashboard",
};

export default RedirectUrl;
