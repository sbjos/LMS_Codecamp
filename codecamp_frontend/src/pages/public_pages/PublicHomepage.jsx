import { useNavigate } from "react-router-dom";
import RedirectUrl from "../../components/RedirectUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleCheck,
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
            <h1>Welcome to the assignment review app</h1>
          </div>
        </section>
        <section className="public-section-3">
          <div className="public-section-3-container">
            <div className="public-cards">
              <ul class="card-group public-card-group">
                <li class="card public-card">
                  <div className="public-icon-container">
                    <FontAwesomeIcon
                      className="public-icon"
                      icon={faList}
                    />
                  </div>
                  <div class="card-body public-card-body">
                    <h5 class="card-title public-card-title">Easy to use</h5>
                    <p class="card-text public-card-text">
                      Straight forward assignment submission and navigation.
                      Never get lost looking for something.
                    </p>
                  </div>
                </li>
                <li class="card public-card">
                  <div className="public-icon-container">
                    <FontAwesomeIcon
                      className="public-icon"
                      icon={faMagnifyingGlass}
                    />
                  </div>
                  <div class="card-body public-card-body">
                    <h5 class="card-title public-card-title">
                      Feedback matters
                    </h5>
                    <p class="card-text public-card-text">
                      You get clear review trough videos and notes of your
                      projects. Get better at codibg.
                    </p>
                  </div>
                </li>
                <li class="card public-card">
                  <div className="public-icon-container">
                    <FontAwesomeIcon
                      className="public-icon"
                      icon={faCircleQuestion}
                    />
                  </div>
                  <div class="card-body public-card-body">
                    <h5 class="card-title public-card-title">Need help</h5>
                    <p class="card-text public-card-text">
                      Support is just a few click away. Never feel lost or
                      overwhelmed in your work.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="public-section-4">
          <div className="public-section-4-container">
            <div className="public-image-container">
              <img
                src="src\assets\images\card-screenshot.png"
                class="public-img"
                alt="Learner's dashboard"
              />
            </div>
            <div className="public-text-container">
              <ul className="public-info-text-List">
                <li className="public-info-text">
                  <FontAwesomeIcon
                    className="public-icon"
                    icon={faCheck}
                  />{" "}
                  A simple, and easy assignment card.
                </li>
                <li className="public-info-text">
                  <FontAwesomeIcon
                    className="public-icon"
                    icon={faCheck}
                  />{" "}
                  Information available up ront.
                </li>
                <li className="public-info-text">
                  <FontAwesomeIcon
                    className="public-icon"
                    icon={faCheck}
                  />{" "}
                  View or edit options righ from the card.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="public-section-5">
        <footer className="footer text-dark-emphasis">
        <div className="rightreserved-text">
          &copy; 2024 <b className="navbar-brand-custom">{"codeCamp/>"}</b>{" "}
          &nbsp; All rights reserved.
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
        </section>
      </div>
    </>
  );
}

export default PublicHomepage;
