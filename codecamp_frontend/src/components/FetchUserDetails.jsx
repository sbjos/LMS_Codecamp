import { useEffect, useState } from "react";
import axios from "axios";

function FetchUserDetails() {
  const token = localStorage.getItem("lmsusertoken");
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user", {
          headers: { Authorization: "Bearer " + token },
        });
        setUserDetails(response.data);
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

    return userDetails;
}

export default FetchUserDetails;
