import { Route, Redirect } from "react-router-dom/cjs/react-router-dom";

const GuardedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isLoggedIn) {
        return <Component {...props} />;
      }
      return <Redirect push to="/login" />;
    }}
  />
);

export default GuardedRoute;
