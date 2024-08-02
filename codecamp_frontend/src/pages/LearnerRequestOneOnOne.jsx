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
              <h1>Request your One on One</h1>
            </div>
            <div className="oneonone-banner-body">
              <p>
                Ask an instructor for help to sharpen your understanding of
                things, discuss a case or peek their brain on a coding subject.
              </p>
            </div>
          </div>
          <form className="oneonone-form" action="">
            <div className="row oneonone-row">
              <div className="mb-3 col">
                <label for="exampleFormControlInput1" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  aria-label="First name"
                />
              </div>
              <div className="mb-3 col">
                <label for="exampleFormControlInput1" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  id="exampleFormControlInput1"
                  aria-label="Last name"
                />
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                Example textarea
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default LearnerRequestOneOnOne;
