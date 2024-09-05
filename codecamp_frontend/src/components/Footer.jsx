import "../css/Footer.css";

function Footer() {
  return (
    <>
      <footer className="footer text-dark-emphasis">
        <div className="footer-container">
          <div className="rightreserved-text">
            <div className="copyright">
              &copy; 2024 <b className="navbar-brand-custom">{"codeCamp/>"}</b>
            </div>
            <div className="rights-reserved">&nbsp; All rights reserved.</div>
          </div>
          <div className="option-list-container">
            <ul className="option-list">
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
        </div>
      </footer>
    </>
  );
}

export default Footer;
