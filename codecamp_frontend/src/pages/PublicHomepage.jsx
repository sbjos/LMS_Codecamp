import "../css/PublicHomepage.css";

function PublicHomepage() {
  return (
    <>
      <div className="header">
        <h1>Welcome to the assignment review app</h1>
      </div>
      <div className="login-burger">
        <a href="/api/auth/login">
          <button>Login</button>
        </a>
      </div>
    </>
  );
}

export default PublicHomepage;
