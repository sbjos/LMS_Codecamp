import { useNavigate } from "react-router-dom";
import RedirectUrl from "../../components/RedirectUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleQuestion,
  faList,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/Logo";
import "../../css/PublicHomepage.css";

function PublicHomepage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");

  const handleClick = () => {
    if (token && userAuthority) {
      return navigate("auth");
    } else {
      return navigate("login");
    }
  };

  return (
    <>
      <div className="public-root">
        <section className="public-section-1">
          <div className="public-section-1-container">
            <div className="public-logo">{Logo(null)}</div>
            <div className="public-buttons">
              <button
                className="btn public-login-btn btn-custom"
                onClick={handleClick}
              >
                Login
              </button>
              <button
                className="btn public-register-btn btn-custom"
                onClick={() => navigate(RedirectUrl.Register)}
              >
                Register
              </button>
            </div>
          </div>
        </section>
        <section className="public-section-2">
          <div className="public-section-2-container">
            <div className="public-header">
              <h1 className="public-header-welcome">
                Welcome to <span>{Logo()}</span>
              </h1>
              <h5 className="public-header-description">
                Your assignment review app
              </h5>
            </div>
          </div>
        </section>
        <section className="public-section-3">
          <div className="public-section-3-container">
            <div className="public-cards">
              <ul className="public-card-group">
                <li className="public-card public-card-1">
                  <div className="public-icon-container">
                    <FontAwesomeIcon className="public-icon" icon={faList} />
                  </div>
                  <div className="public-card-body">
                    <h5 className="public-card-title">Easy to use</h5>
                    <p className="public-card-text">
                      Straight forward assignment submission and navigation.
                      Never feel lost in your dashboard.
                    </p>
                  </div>
                </li>
                <li className="public-card public-card-2">
                  <div className="public-icon-container">
                    <FontAwesomeIcon
                      className="public-icon"
                      icon={faMagnifyingGlass}
                    />
                  </div>
                  <div className="public-card-body">
                    <h5 className="public-card-title">Feedback matters</h5>
                    <p className="public-card-text">
                      Get clear feedbacks trough videos and notes from your
                      instructor to help you get better at your task.
                    </p>
                  </div>
                </li>
                <li className="public-card public-card-3">
                  <div className="public-icon-container">
                    <FontAwesomeIcon
                      className="public-icon"
                      icon={faCircleQuestion}
                    />
                  </div>
                  <div className="public-card-body">
                    <h5 className="public-card-title">Need help ?</h5>
                    <p className="public-card-text">
                      Support is just a few click away for your assignments, or
                      to explore different subjects.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="public-section-4">
          <div className="public-section-4-container">
            <div className="public-section-4-content-container">
              <div className="public-image-container">
                <img
                  src="src\assets\images\card-screenshot.png"
                  className="public-img"
                  alt="Learner's dashboard"
                />
              </div>
              <div className="public-text-container">
                <ul className="public-info-text-List">
                  <li className="public-info-text">
                    <FontAwesomeIcon
                      className="public-icon-check"
                      icon={faCheck}
                    />{" "}
                    Simple, and easy ways to review assignments.
                  </li>
                  <li className="public-info-text">
                    <FontAwesomeIcon
                      className="public-icon-check"
                      icon={faCheck}
                    />{" "}
                    Most recent assignments available up front in cards.
                  </li>
                  <li className="public-info-text">
                    <FontAwesomeIcon
                      className="public-icon-check"
                      icon={faCheck}
                    />{" "}
                    View or edit options righ from the card.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="public-section-5">
          <div className="public-section-5-container">
            <footer className="footer text-dark-emphasis">
              <div className="rightreserved-text">
                &copy; 2024{" "}
                <b className="navbar-brand-custom">{"codeCamp/>"}</b> &nbsp; All
                rights reserved.
              </div>
              <div className="option-list">
                <ul>
                  <li>
                    <a href="">Privacy</a>
                  </li>
                  <li>
                    <a href="">Terms</a>
                  </li>
                  <li>
                    <a href="">Feedback</a>
                  </li>
                  <li>
                    <a href="">Support</a>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </>
  );
}

export default PublicHomepage;
