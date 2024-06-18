import axios from "axios";
import { useNavigate } from "react-router-dom";

function Validate(token, userAuthority) {
  const navigate = useNavigate();
  let status;

  if (!token || !userAuthority) {
    window.location.href = "/api/auth/login";
    localStorage.clear();
  } else {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/validate",
          { headers: { Authorization: "Bearer " + token } }
        );
        status = response.status;
      } catch (err) {
        localStorage.clear();
        if (!err) {
          console.error("No Server Response");
        } else {
          navigate("/api/auth/login");
          localStorage.clear();
          console.error(err);
        }
      }
    };
    fetchData();
  }

  return status;
}

export default Validate;
