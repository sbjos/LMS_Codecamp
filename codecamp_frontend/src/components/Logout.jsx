import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/api/auth/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
