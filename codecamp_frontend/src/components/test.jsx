import { useNavigate } from "react-router-dom";

function test(data) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    switch (data) {
      case data === "REVIEWER":
        navigate("/api/reviewer/dashboard");
        break;
      case data === "logout":
        localStorage.clear();
        navigate("/api/auth/login");
        break;
      case data === "view":
        navigate("/api/auth/login");
    }
  };

  return <button onClick={handleRedirect}>Dashboard</button>;
}

export default test;
