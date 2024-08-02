const userAuthority = localStorage.getItem("lmsuserauthorities");
const authorityArray = userAuthority ? userAuthority.split(", ") : "";
const urlPathVariable = authorityArray[1] + authorityArray[2];
const learnerRootUrl = "/codecamp/dashboard/" + urlPathVariable;
const reviewerRootUrl = "/codecamp/reviewerdashboard/" + urlPathVariable;

const RedirectUrl = {
  // Learner url
  learnerDashboard: learnerRootUrl,
  learnerSubmittedAssignments: learnerRootUrl + "/submitted",
  learnerInReviewAssignments: learnerRootUrl + "/inreview",
  learnerNeedsWorkAssignments: learnerRootUrl + "/needswork",
  learnerCompletedAssignments: learnerRootUrl + "/completed",
  LearnerRequestOneOnOne: learnerRootUrl + "/request1on1",

  // Reviewer url
  reviewerDashboard: reviewerRootUrl,
  reviewerAssignmentView: reviewerRootUrl + "/assignment/",
};

export default RedirectUrl;
