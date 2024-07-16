const userAuthority = localStorage.getItem("lmsuserauthorities");
const authorityArray = userAuthority ? userAuthority.split(", ") : "";
const urlPathVariable = authorityArray[1] + authorityArray[2];
const learnerRootUrl = "/codecamp/dashboard/" + urlPathVariable;
const reviewerRootUrl = "/codecamp/reviewerdashboard/" + urlPathVariable;

const RedirectUrl = {
  learnerDashboard: learnerRootUrl,
  learnerAssignmentView: learnerRootUrl + "/assignment/",
  newAssignment: learnerRootUrl + "/submitassignment",
  learnerCompletedAssignments: learnerRootUrl + "/completed",
  reviewerDashboard: reviewerRootUrl,
  reviewerAssignmentView: reviewerRootUrl + "/assignment/",
};

export default RedirectUrl;
