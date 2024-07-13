function Logout() {
  const handleLogout = () => {
    localStorage.clear();
    navigate("/codecamp/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
