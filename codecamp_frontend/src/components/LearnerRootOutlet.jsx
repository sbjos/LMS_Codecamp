import { Outlet, useNavigate } from "react-router-dom";
import RedirectUrl from "./RedirectUrl";
import "../css/Navbar.css";

function LearnerRootOutlet() {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/codecamp/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-custom">
        <div className="container-fluid bg-transparent">
          <a
            className="navbar-brand navbar-brand-custom"
            href={RedirectUrl.learnerDashboard}
          >
            Codecamp
          </a>
          <button
            className="navbar-toggler navbar-toggler-custom"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-menu-custom">
              <li className="nav-item px-3">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href={RedirectUrl.newAssignment}
                >
                  New assignment
                </a>
              </li>
              <li className="nav-item px-3">
                <a
                  className="nav-link active"
                  href={RedirectUrl.learnerCompletedAssignments}
                >
                  Closed assignments
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link active" href="#">
                  Support
                </a>
              </li>
            </ul>

            {/* dropdown menu */}
            <div className="dropdown-center mx-0">
              <button
                className="btn navbar-btn-custom dropdown-toggle w-auto"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </button>
              <ul className="dropdown-menu dropdown-menu-lg-end navbar-dropdown-menu-custom">
                <li>
                  <a
                    className="dropdown-item navbar-dropdown-menu-item"
                    aria-current="false"
                    href="#"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item navbar-dropdown-menu-item"
                    href="#"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item navbar-dropdown-menu-item"
                    href="#"
                    type="button"
                    onClick={Logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LearnerRootOutlet;
