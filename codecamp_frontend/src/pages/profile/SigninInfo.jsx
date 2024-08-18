import { useEffect, useState } from "react";
import axios from "axios";
import FetchUserDetails from "../../components/FetchUserDetails";
import ProfileOutlet from "../../components/profile/ProfileOutlet";
import "../../css/Profile.css";

function SigninInfo() {
  const userDetails = FetchUserDetails();
  const [isDirty, setDirty] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("lmsusertoken");

  useEffect(() => {
    if (userDetails) {
      setUsername(userDetails.username || "");
    }
  }, [userDetails]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateUser = { username, password };
      const response = await axios.put(
        "http://localhost:8080/api/user",
        updateUser,
        { headers: { Authorization: "Bearer " + token } }
      );
      if (response.status === 200) {
        alert("Updated !");
        window.location.reload();
      }
    } catch (err) {
      if (!err) {
        console.error("No Server Response");
      } else {
        console.error(err);
        alert("Failed to update basic info!");
      }
    }
  };

  ProfileOutlet("basic info");

  return (
    <>
      <div className="profile-header">
        <h5>Security</h5>
      </div>
      <form class="row g-3 profile-form" onSubmit={handleSubmit}>
        <div class="col-md-6 profile-username-container">
          <label htmlFor="validationDefault01" class="form-label">
            User name
          </label>
          <div className="profile-username-container-imput-button">
            <input
              type="text"
              class="form-control profile-form-control profile-form-control-username"
              id="validationDefault01"
              value={username}
              onChange={handleChange(setUsername)}
              required
            />
            <button
              class="btn btn-success btn-custom profile-button profile-button-security"
              type="submit"
              disabled={!isDirty}
            >
              Update
            </button>
          </div>
        </div>
      </form>
      <div class="col-6 profile-password-container">
        <label htmlFor="validationDefault01" class="form-label">
          Password
        </label>
        <div>
          <a className="btn-custom profile-password-button" href="#">
            Change your Password
          </a>
        </div>
      </div>
    </>
  );
}

export default SigninInfo;
