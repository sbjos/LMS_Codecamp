import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import StateComponent from "../../components/select/StateComponent";
import RedirectUrl from "../../components/RedirectUrl";
import Logo from "../../components/Logo";
import "../../css/Registration.css";

function RegistrationPage() {
  // regex
  const USERNAME_REGEX = /^[A-z][A-z0-9-_]{2,13}$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&])[a-zA-Z0-9!@#$%&]{8,24}$/;
  const PHONE_REGEX = /^\d{10}$/;
  const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9_.-]+@[a-z0A-Z-9_.-]+\.[a-z]+$/;
  const ZIPCODE_REGEX = /^\d{5}$/;

  const [type, setType] = useState("password");
  const [success, setSuccess] = useState(false);
  const [isUsernameAvailable, setUsernameAvailable] = useState(true);
  const [isEnmailAvailable, setEmailAvailable] = useState(true);

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

    setUsernameAvailable(true);
    setEmailAvailable(true);
    setValidUsername(true);
    setValidPassword(true);
    setPasswordMatch(true);

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
        const authorities = ["LEARNER"];
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
        if (!err.response) {
          console.error("No Server Response");
          alert("No Server Response");
        }
        if (err.response.status === 409) {
          const data = err.response.data.detail;
          data;
          switch (data) {
            case "Detail: Key (user_name)=(" + username + ") already exists.":
              console.error("err", err);
              setUsernameAvailable(false);
              break;
            case "email":
            case "Detail: Key (email)=(" + email + ") already exists.":
              setEmailAvailable(false);
              break;
          }
        } else {
          console.error("err", err);
          alert("Registration failed");
        }
      }
    }
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    // setDirty(true);
  };

  const handleToggle = (value) => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
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

  function usernameError(valid, available) {
    if (!valid) {
      return (
        <>
          <p>
            Username must be between 3 and 13 characters long with letters,
            numbers and (. _ -).
          </p>
        </>
      );
    }

    if (!available) {
      return (
        <>
          <p>This username is already taken. Try another one.</p>
        </>
      );
    }
  }

  function PasswordError(passwordLength, valid) {
    if (passwordLength < 7 || passwordLength > 23) {
      return (
        <>
          <p>"Your password must be between 8 to 24 characters."</p>
        </>
      );
    }

    if (passwordLength > 8 || (passwordLength < 23 && !valid)) {
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

  function emailError(valid, Available) {
    if (!valid) {
      return (
        <>
          <p>Please verify your email format and try again.</p>
        </>
      );
    }

    if (!Available) {
      return (
        <>
          <p>This email address already exist. Try another one.</p>
        </>
      );
    }
  }

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
                className="btn btn-primary logo-btn"
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
          <div className="registration-logo">{Logo(RedirectUrl.Homepage)}</div>
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
                With a feedback video, your instructor can easily put the focus
                on needs work assignments.
              </p>
              <p>
                Let's get started. Complete the registration form and sign in to
                your account.
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
                isValidUsername && isUsernameAvailable
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
                className={
                  isValidUsername && isUsernameAvailable
                    ? "hidden"
                    : "error-text"
                }
                id="errUsernameInput"
              >
                <FontAwesomeIcon className="error-icon" icon={faInfoCircle} />
                {usernameError(isValidUsername, isUsernameAvailable)}
              </div>
            </div>
            <div
              className={
                isValidPassword
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
                type={type}
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
                {PasswordError(password.length, isValidPassword)}
              </div>
              <div className="form-check registration-form-checkbox">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onClick={handleToggle}
                />
                <label
                  className="form-check-label registration-form-checkbox-label"
                  htmlFor="flexCheckDefault"
                >
                  Show password
                </label>
              </div>
            </div>
            <div
              className={
                isPasswordMatch
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
                type={type}
                className="form-control registration-form-control"
                id="validationDefaultUConfirmPassword-Test"
                aria-invalid={isPasswordMatch}
                aria-describedby="errConfirmaPasswordInput"
                placeholder="Password"
                onChange={handleChange(setConfirmPassword)}
                required
              />
              <div
                className={isPasswordMatch ? "hidden" : "error-text"}
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
                isValidEmail && isEnmailAvailable
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
                className={
                  isValidEmail && isEnmailAvailable ? "hidden" : "error-text"
                }
                id="errorEmailInput"
              >
                <FontAwesomeIcon className="error-icon" icon={faInfoCircle} />
                {emailError(isValidEmail, isEnmailAvailable)}
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
                <p>
                  Phone number should be 10 digits and only numerical. Try
                  again.
                </p>
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
            <div className="registration-btn-container col-12">
              <button
                className="btn btn-primary btn-custom registration-btn"
                type="submit"
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
