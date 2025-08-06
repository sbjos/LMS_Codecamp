import { useEffect, useState } from "react";
import axios from "axios";
import FetchUserDetails from "../../components/FetchUserDetails";
import StateComponent from "../../components/select/StateComponent";
import "../../css/Profile.css";

function PersonalInfo() {
  const userDetails = FetchUserDetails();
  const [isDirty, setDirty] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const token = localStorage.getItem("lmsusertoken");

  useEffect(() => {
    if (userDetails) {
      setFirstname(userDetails?.firstname || "");
      setLastname(userDetails?.lastname || "");
      setEmail(userDetails.contact?.email || "");
      setPhone(userDetails.contact?.phone || "");
      setStreet(userDetails.address?.street || "");
      setNumber(userDetails.address?.number || "");
      setCity(userDetails.address?.city || "");
      setState(userDetails.address?.state || "");
      setZipcode(userDetails.address?.zipcode || "");
    }
  }, [userDetails]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const address = { street, number, city, state, zipcode };
      const contact = { email, phone };
      const updateUser = { firstname, lastname, address, contact };
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

  return (
    <>
    <div className="profile-root">
      <div className="profile-header">
        <h5>Personal Information</h5>
      </div>
      <form className="row g-3 profile-form" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control profile-form-control"
            id="validationDefault01"
            value={firstname}
            onChange={handleChange(setFirstname)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control profile-form-control"
            id="validationDefault01"
            value={lastname}
            onChange={handleChange(setLastname)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">
            Email address
          </label>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              id="validationDefault01"
              value={email}
              onChange={handleChange(setEmail)}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">
            Phone number
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control profile-form-control"
              id="validationDefault01"
              value={phone}
              onChange={handleChange(setPhone)}
              required
            />
          </div>
        </div>
        <div className="col-md-6 profile-street-container">
          <label htmlFor="validationDefault01" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control profile-form-control"
            id="validationDefault01"
            value={street}
            onChange={handleChange(setStreet)}
            required
          />
        </div>
        <div className="col-md-6 profile-number-container">
          <label htmlFor="validationDefault01" className="form-label">
            App / Suite
          </label>
          <input
            type="text"
            className="form-control profile-form-control profile-form-control-app"
            id="validationDefault01"
            value={number}
            onChange={handleChange(setNumber)}
          />
        </div>
        <div className="col-md-6 profile-city-container">
          <label htmlFor="validationDefault01" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control profile-form-control"
            id="validationDefault01"
            value={city}
            onChange={handleChange(setCity)}
            required
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="validationDefault01" className="form-label">
            State
          </label>
          <select
            className="form-select profile-form-control profile-form-control-state-dropdown"
            aria-label="Default select example"
            onChange={handleChange(setState)}
            required
          >
            {StateComponent(state)}
          </select>
        </div>
        <div className="col-md-3 profile-zip-container">
          <label htmlFor="validationDefault01" className="form-label">
            Zipcode
          </label>
          <input
            type="number"
            className="form-control profile-form-control"
            id="validationDefault01"
            value={zipcode}
            onChange={handleChange(setZipcode)}
            required
          />
        </div>
        <div className="col-12"></div>
        <div className="col-12">
          <button
            className="btn btn-success btn-custom profile-button"
            type="submit"
            disabled={!isDirty}
          >
            Update
          </button>
        </div>
      </form>
      </div>
    </>
  );
}

export default PersonalInfo;
