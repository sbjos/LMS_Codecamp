import RedirectUrl from "./RedirectUrl";

function Logout() {
  localStorage.clear();
  navigate(RedirectUrl.Login);
}

export default Logout;
