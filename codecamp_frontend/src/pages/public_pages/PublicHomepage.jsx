import { useNavigate } from "react-router-dom";
import RedirectUrl from "../../components/RedirectUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import {
  faCheck,
  faCircleQuestion,
  faList,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/Logo";
import Footer from "../../components/Footer";
import "../../css/PublicHomepage.css";

function PublicHomepage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const [text, setText] = useState({});

  useEffect(() => {
    fetch("src/Text/publichomepagetexts.json")
      .then((res) => res.json())
      .then((data) => setText(data))
      .catch((err) => console.error("Failed to load text", err));
  }, []);

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
              <h1 className="public-header-welcome">{text.welcome}</h1>
              <p className="public-header-description">
                {text.welcomeDescription}
              </p>
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
                    <h5 className="public-card-title">{text.demo1}</h5>
                    <p className="public-card-text">{text.demo1Description}</p>
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
                    <h5 className="public-card-title">{text.demo2}</h5>
                    <p className="public-card-text">{text.demo2Description}</p>
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
                    <h5 className="public-card-title">{text.demo3}</h5>
                    <p className="public-card-text">{text.demo3Description}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="public-section-4">
          <div className="public-section-4-container">
            <div className="public-section-4-content-container">
              <div className="public-text-container">
                <div className="public-image-container">
                  <img
                    src="src\assets\images\card-screenshot.png"
                    className="public-img"
                    alt="Learner's dashboard"
                  />
                </div>
                <ul className="public-info-text-List">
                  <li className="public-info-text">
                    <div>
                      <FontAwesomeIcon
                        className="public-icon-check"
                        icon={faCheck}
                      />
                    </div>
                    {text.cardText1}
                  </li>
                  <li className="public-info-text">
                    <div>
                      <FontAwesomeIcon
                        className="public-icon-check"
                        icon={faCheck}
                      />
                    </div>
                    {text.cardText2}
                  </li>
                  <li className="public-info-text">
                    <div>
                      <FontAwesomeIcon
                        className="public-icon-check"
                        icon={faCheck}
                      />
                    </div>
                    {text.cardText3}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="public-section-5">
          <div className="public-section-5-container">
            <div className="public-footer">
              <Footer />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PublicHomepage;
