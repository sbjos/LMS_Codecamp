import { Outlet } from "react-router-dom";
import RedirectUrl from "../RedirectUrl";
import "../../css/Profile.css";

function ProfileOutlet() {
  return (
    <>
      <div className="profile-root">
        <section className="profile-section-1"></section>
        <section className="profile-section-2">
          <div className="profile-nav-item">
            <div className="nav-item nav-item-info">
              <a
                type="button"
                className="nav-link btn-card-link profile-nav-btn"
                aria-current="page"
                href={RedirectUrl.ProfileBasicInfo}
              >
                Basic info
              </a>
            </div>
            <div className="nav-item nav-item-security">
              <a
                className="nav-link btn-card-link profile-nav-btn"
                href={RedirectUrl.ProfileSecurity}
              >
                Security
              </a>
            </div>
            <div className="nav-item nav-item-preference">
              <a className="nav-link btn-card-link profile-nav-btn" href="#">
                Preference
              </a>
            </div>
          </div>
          <main className="profile-option-window">
            <Outlet />
          </main>
        </section>
        <section className="profile-section-3"></section>
      </div>
    </>
  );
}

export default ProfileOutlet;
