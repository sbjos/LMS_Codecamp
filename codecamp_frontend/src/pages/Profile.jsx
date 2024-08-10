import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Profile.css";

function Profile() {
  const [userDetail, setUserDetail] = useState([]);
  const token = localStorage.getItem("lmsusertoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user", {
          headers: { Authorization: "Bearer " + token },
        });
        setUserDetail(response.data);
      } catch (err) {
        if (!err) {
          console.error("No server response");
        } else {
          console.error(err);
        }
      }
    };
    fetchData();
  }, []);

  console.log("user", userDetail);

  return (
    <>
      <div className="profile-root">
        <section className="profile-section-1"></section>
        <section className="profile-section-2">
          <div className="profile-personal profile-label">
            <div className="label-container">
              <h5 className="label label-personal">Personal information</h5>
              <a href="">Edit</a>
            </div>
            <p>{userDetail.firstname}</p>
            <p>{userDetail.lastname}</p>
          </div>
          <div className="profile-address profile-label">
            <div className="label-container">
              <h5 className="label label-address">Address</h5>
              <a href="">Edit</a>
            </div>
            <p>{userDetail.address} {userDetail.address2}</p>
            <p>{userDetail.city}</p>
            <p>{userDetail.state}</p>
            <p>{userDetail.zipcode}</p>
          </div>
          <div className="profile-contact profile-label">
            <div className="label-container">
              <h5 className="label label-contact">Contact</h5>
              <a href="">Edit</a>
            </div>
            <p>{userDetail.username}</p>
          </div>

        </section>
        <section className="profile-section-3"></section>
      </div>
    </>
  );
}

export default Profile;
