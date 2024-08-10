import Timezone from "../components/Timezone";
import Validate from "../components/Validate";
import "../css/OneOnOne.css";

function LearnerRequestOneOnOne() {
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");

  // Validate a user's access to a webpage
  Validate(token, userAuthority);

  return (
    <>
      <div className="oneonone-root">
        <section className="oneonone-section-1"></section>
        <section className="oneonone-section-2">
          <div className="oneonone-banner-section">
            <div className="oneonone-banner-header">
              <h1 className="oneonone-header">Need help?</h1>
            </div>
            <div className="oneonone-banner-body">
              <p>
                Welcome to the need help section of your dashboard where support
                is provided to help you understand coding techniques, subjects
                and developing your projects.
              </p>
              <ul>
                <li>
                  <p>
                    Ask an instructor. Sharpen your skills, discuss an
                    assignment, or peek their brain on a coding subject.
                  </p>
                </li>

                <li>
                  <p>
                    After submission, an instructor will reach out to you within
                    24 hours with their availability.
                  </p>
                </li>

                <li>
                  <p>
                    Let them know if you can or can't make it, Once a date is
                    confirmed a meeting link will be sent to you via email.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <form className="oneonone-form" action="">
            <div className="oneonone-form-header">
              <h1>Request a One on One</h1>
            </div>
            <div className="row oneonone-row">
              <div className="mb-3 col">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label oneonone-form-label"
                >
                  First name<span className="form-required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control oneonone-form-control"
                  placeholder="First name"
                  aria-label="First name"
                />
              </div>
              <div className="mb-3 col">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label oneonone-form-label"
                >
                  Last name<span className="form-required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control oneonone-form-control"
                  placeholder="Last name"
                  id="exampleFormControlInput1"
                  aria-label="Last name"
                />
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label oneonone-form-label"
              >
                Email address<span className="form-required">*</span>
              </label>
              <input
                type="email"
                className="form-control oneonone-form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label oneonone-form-label"
              >
                Time zone<span className="form-required">*</span>
              </label>
              <Timezone />
            </div>
            <div className="mb-4">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label oneonone-form-label"
              >
                What do you need help with?
              </label>
              <textarea
                className="form-control oneonone-form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div>
              <button type="button" className="btn btn-success btn-custom">
                Submit
              </button>
            </div>
          </form>
        </section>
        <section className="oneonone-section-3"></section>
      </div>
    </>
  );
}

export default LearnerRequestOneOnOne;
