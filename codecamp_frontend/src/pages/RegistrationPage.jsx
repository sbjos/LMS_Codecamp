import { useState } from "react";

function RegistrationPage() {
  // States for registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
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
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };

  return (
    <>
      <div className="registration-form">
        <div>
          <h1>User Registration</h1>
        </div>

        <form>
          {/* Inputs for form data */}
          <label className="registration-label">User name</label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
              setSubmitted(false);
            }}
            className="input"
            type="text"
            value={username}
          />

          <label className="registration-label">First name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setSubmitted(false);
            }}
            required
          />

          <label className="registration-label">Last name</label>
          <input
            onChange={(e) => {
              setLastName(e.target.value);
              setSubmitted(false);
            }}
            className="input"
            value={lastName}
            type="text"
          />

          <label className="registration-label">Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setSubmitted(false);
            }}
            className="input"
            value={email}
            type="email"
          />

          <label className="registration-label">Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              setSubmitted(false);
            }}
            className="input"
            value={password}
            type="password"
          />

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default RegistrationPage;
