import "../css/PublicHomepage.css";

function PublicHomepage() {
  return (
    <>
      <div className="header">
        <h1>Welcome to the assignment review app</h1>
      </div>
      <div className="login-burger"></div>
      <a href="/api/auth/login">
        <button>Login</button>
      </a>
      <a href="/api/signup">
        <button>sign up</button>
      </a>
    </>
  );
}

export default PublicHomepage;
