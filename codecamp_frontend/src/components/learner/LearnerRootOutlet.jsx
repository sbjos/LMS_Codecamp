import { Outlet } from "react-router-dom";
import LearnerHeader from "../LearnerHeader";
import Footer from "../Footer";

function LearnerRootOutlet() {
  return (
    <>
      <div className="dashboard-header">
        <LearnerHeader />
      </div>
      <main className="main">
        <div className="learner-page-root">
          <Outlet />
        </div>
      </main>
      <div className="dashboard-footer">
        <Footer />
      </div>
    </>
  );
}

export default LearnerRootOutlet;
