import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import StateComponent from "../../components/select/StateComponent";
import RedirectUrl from "../../components/RedirectUrl";
import Logo from "../../components/Logo";
import "../../css/Registration.css";

function RegistrationPage() {
  // regex
  const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,13}$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&])[a-zA-Z0-9!@#$%&]{8,24}$/;
  const PHONE_REGEX = /^\d{10}$/;
  const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9_.-]+@[a-z0A-Z-9_.-]+\.[a-z]+$/;
  const ZIPCODE_REGEX = /^\d{5}$/;

  // States for registration
  // const [isDirty, setDirty] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [username, setUsername] = useState("");
  const [isValidUsername, setValidUsername] = useState(true);

  const [password, setPassword] = useState("");
  const [isValidPassword, setValidPassword] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setPasswordMatch] = useState(true);

  const [email, setEmail] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);

  const [phone, setPhone] = useState("");
  const [isValidPhone, setValidPhone] = useState(true);

  const [zipcode, setZipcode] = useState("");
  const [isValidZipcode, setValidZipcode] = useState(true);

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validUsername = USERNAME_REGEX.test(username);
    const validPassword = PASSWORD_REGEX.test(password);
    const passwordMatch = password === confirmPassword;
    const validEmail = EMAIL_REGEX.test(email);
    const validOhone = PHONE_REGEX.test(phone);
    const validZipcode = ZIPCODE_REGEX.test(zipcode);

    setValidUsername(validUsername);
    setValidPassword(validPassword);
    setPasswordMatch(passwordMatch);
    setValidEmail(validEmail);
    setValidPhone(validOhone);
    setValidZipcode(validZipcode);

    if (
      validUsername &&
      validPassword &&
      passwordMatch &&
      validEmail &&
      validOhone &&
      validZipcode
    ) {
      try {
        const contact = { email, phone };
        const address = { street, number, city, state, zipcode };
        const authorities = "LEARNER";
        const updateUser = {
          firstname,
          lastname,
          username,
          password,
          contact,
          address,
          authorities,
        };
        const response = await axios.post(
          "http://localhost:8080/api/create/user",
          updateUser
        );
        if (response.status === 201) {
          setSuccess(true);
        }
      } catch (err) {
        if (!err) {
          console.error("No Server Response");
        } else {
          console.error(err);
          alert("Registration failed");
        }
      }
    }
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    // setDirty(true);
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>{firstname}, you have successfully registered!!</h1>
      </div>
    );
  };

  function PasswordError(passwordLength, isValidPassword, isPasswordMatch) {
    if (passwordLength <= 7 || passwordLength > 23) {
      return (
        <>
          <p>"Your password must contain 8 to 24 characters"</p>
        </>
      );
    }

    if (passwordLength > 8 || (passwordLength < 23 && !isValidPassword)) {
      return (
        <>
          <p>
            "Your password must contain a mix of upper and lower case letters,
            numbers, and symbols (!@#$%&)."
          </p>
        </>
      );
    }
  }

  const showPassword = () => {};

  return success ? (
    <>
      <div className="registration-root-success">
        <section className="registration-section-1"></section>
        <section className="registration-section-2">
          <div className="registration-success">
            <h2>You are now registered</h2>
            <p>
              <a
                type="button"
                className="btn btn-primary registration-btn"
                href={RedirectUrl.Login}
              >
                Login
              </a>
            </p>
          </div>
        </section>
        <section className="registration-section-3"></section>
      </div>
    </>
  ) : (
    <>
      <div className="registration-root">
        <section className="registration-section-1"></section>
        <section className="registration-section-2">
          <div className="registration-logo">
            <Logo />
          </div>
          <div className="registration-header">
            <h1>User Registration</h1>
            <br className="space" />
            <h5>Welcome to codeCamp.</h5>

            <div className="registration-patagraph">
                <p>Ready for the next step?</p>
                <p>
                  codeCamp provides an easy, straight forward way to submit your
                  assignments.
                </p>
                <p>
                  With a feedback video, your instructor can easily put the
                  focus on needs work assignments.
                </p>
                <p>
                  Let's get started. Complete the registration form and sign in
                  to your account.
                </p>
              </div>
          </div>
          <form className="row g-3 registration-form" onSubmit={handleSubmit}>
            <div className="registration-container-header-exception">
              <h5>Personal info</h5>
            </div>
            <div className="col-md-4 registration-field-container registration-firstname-container">
              <label htmlFor="validationDefaultirstname" className="form-label">
                First name<span className="form-required">*</span>
              </label>
              <input
                type="text"
                className="form-control registration-form-control registration-firstname"
                id="validationDefaultFirstname"
                placeholder="First name"
                onChange={handleChange(setFirstname)}
                required
              />
            </div>
            <div className="col-md-4 registration-field-container registration-lastname-container">
              <label htmlFor="validationDefaultLastname" className="form-label">
                Last name<span className="form-required">*</span>
              </label>
              <input
                type="text"
                className="form-control registration-form-control"
                id="validationDefaultLastname"
                placeholder="Last name"
                onChange={handleChange(setLastname)}
                required
              />
            </div>
            <div
              className={
                isValidUsername
                  ? "col-md-4 registration-field-container registration-username-container "
                  : "col-md-4 registration-field-container registration-username-container error"
              }
            >
              <label htmlFor="validationDefaultUsername" className="form-label">
                Username<span className="form-required">*</span>
              </label>
              <input
                type="text"
                className="form-control registration-form-control"
                id="validationDefaultUsername"
                autoComplete="off"
                aria-invalid={isValidUsername}
                aria-describedby="errUsernameInput"
                placeholder="User name"
                onChange={handleChange(setUsername)}
                required
              />
              <div
                className={isValidUsername ? "hidden" : "error-text"}
                id="errUsernameInput"
              >
                <FontAwesomeIcon className="error-icon" icon={faInfoCircle} />
                <p>Only letters, numbers and (. _ -) are allowed.</p>
              </div>
            </div>
            <div
              className={
                isValidPassword || !isPasswordMatch
                  ? "col-md-4 registration-field-container registration-password-container"
                  : "col-md-4 registration-field-container registration-password-container error"
              }
            >
              <label
                htmlFor="validationDefaultPasssword-Test"
                className="form-label"
              >
                Password<span className="form-required">*</span>
              </label>
              <input
                type="password"
                className="form-control registration-form-control"
                id="validationDefaultPasssword-Test"
                aria-invalid={isValidPassword}
                aria-describedby="errPasswordInput"
                placeholder="Password"
                onChange={handleChange(setPassword)}
                required
              />
              <div></div>

              <div
                className={isValidPassword ? "hidden" : "error-text"}
                id="errUsernameInput"
              >
                <FontAwesomeIcon className="error-icon" icon={faInfoCircle} />
                {PasswordError(password.length, isValidPassword, null)}
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Show password
                </label>
              </div>
            </div>
            <div
              className={
                isValidPassword && isPasswordMatch
                  ? "col-md-4 registration-field-container registration-password-match-container"
                  : "col-md-4 registration-field-container registration-password-match-container error"
              }
            >
              <label
                htmlFor="validationDefaultUConfirmPassword-Test"
                className="form-label"
              >
                Confirm password<span className="form-required">*</span>
              </label>
              <input
                type="password"
                className="form-control registration-form-control"
                id="validationDefaultUConfirmPassword-Test"
                aria-invalid={isPasswordMatch}
                aria-describedby="errConfirmaPasswordInput"
                placeholder="Password"
                onChange={handleChange(setConfirmPassword)}
                required
              />
              <div
                className={
                  isValidPassword && isPasswordMatch ? "hidden" : "error-text"
                }
                id="errConfirmaPasswordInput"
              >
                <FontAwesomeIcon className="error-icon" icon={faInfoCircle} />
                <p>The passwords didn’t match. Try again.</p>
              </div>
            </div>

            <hr className="registration-line" />
            <div className="registration-container-header">
              <h5>Contact</h5>
            </div>
            <div
              className={
                isValidEmail
                  ? "col-md-4 registration-field-container registration-email-container"
                  : "col-md-4 registration-field-container registration-email-container error"
              }
            >
              <label htmlFor="validationDefaulEmail" className="form-label">
                Email address<span className="form-required">*</span>
              </label>

              <input
                type="email"
                className="form-control registration-form-control"
                id="validationDefaulEmail"
                aria-invalid={isValidEmail}
                aria-describedby="errorEmailInput"
                placeholder="user@mail.com"
                onChange={handleChange(setEmail)}
                required
              />
              <div
                className={isValidEmail ? "hidden" : "error-text"}
                id="errorEmailInput"
              >
                <FontAwesomeIcon className="error-icon" icon={faInfoCircle} />
                <p>Please verify your email format and try again.</p>
              </div>
            </div>
            <div
              className={
                isValidPhone
                  ? "col-md-4 registration-field-container registration-phone-container"
                  : "col-md-4 registration-field-container registration-phone-container error"
              }
            >
              <label htmlFor="validationDefaultphone" className="form-label">
                Phone number<span className="form-required">*</span>
              </label>

              <input
                type="tel"
                className="form-control registration-form-control"
                id="validationDefaultphone"
                aria-invalid={isValidPhone}
                aria-describedby="errorPhoneInput"
                placeholder="Phone number"
                onChange={handleChange(setPhone)}
                required
              />
              <div
                className={isValidPhone ? "hidden" : "error-text"}
                id="errorPhoneInput"
              >
                <FontAwesomeIcon className="error-icon" icon={faInfoCircle} />
                <p>Phone number should only be numerical. Try again.</p>
              </div>
            </div>
            <hr className="registration-line" />
            <div className="registration-container-header">
              <h5>Address</h5>
            </div>
            <div className="col-md-6 registration-field-container registration-street-container">
              <label htmlFor="validationDefaultStreet" className="form-label">
                Street<span className="form-required">*</span>
              </label>
              <input
                type="text"
                className="form-control registration-form-control"
                id="validationDefaultStreet"
                placeholder="123 main st"
                onChange={handleChange(setStreet)}
                required
              />
            </div>
            <div className="col-md-6 registration-field-container registration-number-container">
              <label htmlFor="validationDefaultNumber" className="form-label">
                App / Suite
              </label>
              <input
                type="text"
                className="form-control registration-form-control"
                id="validationDefaultNumber"
                placeholder="app"
                onChange={handleChange(setNumber)}
              />
            </div>
            <div className="col-md-6 registration-field-container registration-city-container">
              <label htmlFor="validationDefaultCity" className="form-label">
                City<span className="form-required">*</span>
              </label>
              <input
                type="text"
                className="form-control registration-form-control"
                id="validationDefaultCity"
                placeholder="City"
                onChange={handleChange(setCity)}
                required
              />
            </div>
            <div className="col-md-3 registration-field-container registration-state-container">
              <label htmlFor="validationDefaultState" className="form-label">
                State<span className="form-required">*</span>
              </label>
              <select
                className="form-select registration-form-control registration-form-control-timezone-dropdown"
                id="validationDefaultState"
                aria-label="Default select example"
                onChange={handleChange(setState)}
                required
              >
                <option value="none" defaultValue disabled>
                  Choose a state
                </option>
                {StateComponent(state)}
              </select>
            </div>
            <div
              className={
                isValidZipcode
                  ? "col-md-3 registration-field-container registration-zipcode-container"
                  : "col-md-3 registration-field-container registration-zipcode-container error"
              }
            >
              <label htmlFor="validationDefaultZipcode" className="form-label">
                Zipcode<span className="form-required">*</span>
              </label>
              <input
                type="text"
                className="form-control registration-form-control"
                id="validationDefaultZipcode"
                aria-invalid={isValidZipcode}
                aria-describedby="errorPhoneInput"
                placeholder="Zipcode"
                onChange={handleChange(setZipcode)}
                required
              />
              <div
                className={isValidZipcode ? "hidden" : "error-text"}
                id="errorPhoneInput"
              >
                <FontAwesomeIcon className="error-icon" icon={faInfoCircle} />
                <p>The zipcode should be a 5 digit number.</p>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary btn-custom registration-btn"
                type="submit"
                // disabled={!isDirty}
              >
                Submit
              </button>
            </div>
          </form>
        </section>
        <section className="registration-section-3"></section>
      </div>
    </>
  );
}

export default RegistrationPage;
