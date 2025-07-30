import { useNavigate } from "react-router-dom";
import RedirectUrl from "../../components/RedirectUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  const [text, setText] = useState("");
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetch("public/text/publichomepagetexts.json")
      .then((res) => res.json())
      .then((data) => setText(data))
      .catch((err) => console.error("Failed to load text", err));
  }, []);

  useEffect(() => {
    setHeader(text.demo);
  }, []);

  if (!text) return null;

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
        <section className="public-section-2 fade-in-3">
          <div className="public-section-2-container">
            <div className={"public-header"}>
              <h1 className="public-header-welcome fade-in-1">
                {text.intro.welcome}
              </h1>
              <p className="public-header-description fade-in-2">
                {text.intro.welcomeDescription}
              </p>
            </div>
          </div>
        </section>
        <section className="public-section-3">
          <div className="public-section-3-container">
            <div className="public-cards">
              <ul className="public-card-group">
                {[1, 2, 3].map((i) => (
                  <motion.li
                    key={i}
                    className={`public-card public-card-${i}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="public-icon-container">
                      <FontAwesomeIcon
                        className="public-icon"
                        icon={
                          i === 1
                            ? faList
                            : i === 2
                            ? faMagnifyingGlass
                            : faCircleQuestion
                        }
                      />
                    </div>
                    <div className="public-card-body">
                      <h5 className="public-card-title">
                        {i === 1
                          ? text.demo1?.header
                          : i === 2
                          ? text.demo2?.header
                          : text.demo3?.header}
                      </h5>
                      <p className="public-card-text">
                        {i === 1
                          ? text.demo1?.body
                          : i === 2
                          ? text.demo2?.body
                          : text.demo3?.body}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="public-section-4">
          <div className="public-section-4-container">
            <div className="public-section-4-content-container">
              <div className="public-text-container">
                <motion.li
                  className="public-image-container"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="src\assets\images\card-screenshot.png"
                    className="public-img"
                    alt="Learner's dashboard"
                  />
                </motion.li>
                <ul className="public-info-text-List">
                  {[1, 2, 3].map((i) => (
                    <motion.li
                      key={i}
                      className={`public-card public-card-${i}`}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.4 }}
                      viewport={{ once: true }}
                    >
                      {/* <div>
                        <FontAwesomeIcon
                          className="public-icon-check"
                          icon={faCheck}
                        />
                      </div> */}
                      <div className={`public-info-text public-info-text-${i}`}>
                        <div className="public-card-title">
                          {i === 1
                            ? text.cardText1?.body
                            : i === 2
                            ? text.cardText2?.body
                            : text.cardText3?.body}
                        </div>
                      </div>
                    </motion.li>
                  ))}
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
