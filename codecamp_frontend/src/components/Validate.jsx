import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Validate() {
  const token = localStorage.getItem("lmsusertoken");
  const userAuthority = localStorage.getItem("lmsuserauthorities");
  const navigate = useNavigate();
  const [status, setStatus] = useState();

  useEffect(() => {
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
            navigate("login");
            console.error("No Server Response");
          } else {
            console.error(err);
            navigate("/codecamp/login");
          }
        }
      };
      fetchData();
    }
  }, []);

  return status;
}

export default Validate;
