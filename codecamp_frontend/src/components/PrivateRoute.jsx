function PrivateRoute({ element: Component, ...rest }) {
  const token = localStorage.getItem("lmsusertoken");

  return token ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/codecamp/login" replace />
  );
}

export default PrivateRoute;
