import { useEffect, useState } from "react";

import "../css/Footer.css";

function Footer() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("public/text/footertexts.json")
      .then((res) => res.json())
      .then((data) => setText(data))
      .catch((err) => console.error("Failed to load text", err));
  }, []);

  return (
    <>
      <footer className="footer text-dark-emphasis">
        <div className="footer-container">
          <div className="option-list">
            <div className="option-list-info">
              <ul className="list">
                <li>
                  <a href="#">{text.info?.accessibility}</a>
                </li>
                <li>
                  <a href="#">{text.info?.privacy}</a>
                </li>
                <li>
                  <a href="#">{text.info?.terms}</a>
                </li>
                <li>
                  <a href="#">{text.info?.feedback}</a>
                </li>
                <li>
                  <a href="#">{text.info?.support}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-text">
            <div className="rightreserved-text">
              <div className="copyright">
                {text.rights?.copyright}{" "}
                <b className="navbar-brand-custom">{"codeCamp/>"}</b>{" "}
                {text.rights?.reserved}
              </div>
            </div>
            <div className="footer-Text"> {text.rights?.text}</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
