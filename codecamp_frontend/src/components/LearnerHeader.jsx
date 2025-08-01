import RedirectUrl from "./RedirectUrl";
import "../css/LearnerHeader.css";
import Logout from "./Logout";

function LearnerHeader() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom ">
        <div className="container-fluid navbar-container">
          <a
            className="navbar-brand fw-semibold ms-2 fs-5 text-dark-emphasis navbar-brand-custom"
            href={RedirectUrl.learnerdashboard}
          >
            {/* <Logo /> */}
            {"codeCamp/>"}
          </a>
          <button
            className="navbar-toggler btn-sm navbar-toggler-custom"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse collapse navbar-collapse-custom"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-menu-custom">
              <li className="nav-item nav-item-custom">
                <a
                  className="nav-link active mx-3 text-light-emphasis fw-medium"
                  aria-current="page"
                  href={RedirectUrl.learnerdashboard}
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item nav-item-custom">
                <a
                  className="nav-link active mx-3 text-light-emphasis fw-medium"
                  href="#"
                >
                  Search Inbox
                </a>
              </li>
              <li className="nav-item nav-item-custom">
                <a
                  className="nav-link active mx-3 text-light-emphasis fw-medium"
                  href="#"
                >
                  Calendar
                </a>
              </li>
              <li className="nav-item nav-item-custom">
                <a
                  className="nav-link active mx-3 text-light-emphasis fw-medium"
                  href="#"
                >
                  Reminders
                </a>
              </li>
              <li>
                {/* Search bar */}
                <form className="d-flex d-flex-custom" role="search">
                  <input
                    className="form-control mx-2 search-input"
                    type="search"
                    placeholder="Search a poject by name, link or branch"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-secondary search-btn"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </li>
            </ul>
            {/* dropdown menu */}
            <div className="dropdown-center me-4 dropdown-center-custom">
              <button
                className="btn navbar-btn-custom dropdown w-auto"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="grey"
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
                  <p className="navbar-dropdown-name">{name}</p>
                </li>
                <li>
                  <a
                    className="dropdown-item navbar-dropdown-menu-item"
                    aria-current="false"
                    href={RedirectUrl.Profile}
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
    </>
  );
}

export default LearnerHeader;
