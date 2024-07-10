import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Validate(token, userAuthority) {
  const navigate = useNavigate();
  const [status, setStatus] = useState();

  if (!token || !userAuthority) {
    navigate("/codecamp/login");
    localStorage.clear();
  } else {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/validate",
          {
            headers: {
              Authorization: "Bearer " + token,
              Authority: userAuthority,
            },
          }
        );
        setStatus(response.status);
      } catch (err) {
        localStorage.clear();
        if (!err) {
          navigate("/codecamp/login");
          console.error("No Server Response");
        } else {
          localStorage.clear();
          console.error(err);
          navigate("/codecamp/login");
        }
      }
    };
    fetchData();
  }

  console.log("response", status);

  // return status;
}

export default Validate;
