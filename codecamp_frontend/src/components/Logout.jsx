function Logout() {
  localStorage.clear();
  navigate("/codecamp/login");
}

export default Logout;
